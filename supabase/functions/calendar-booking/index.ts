import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "https://esm.sh/resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface GoogleCredentials {
  client_email: string;
  private_key: string;
}

interface AvailableSlot {
  start: string;
  end: string;
  id: string;
}

interface BookingRequest {
  slotId: string;
  slotStart: string;
  duration: number;
  attendeeEmail: string;
  attendeeName: string;
  description: string;
  attachmentPath?: string;
}

async function createJWT(credentials: GoogleCredentials): Promise<string> {
  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: credentials.client_email,
    scope: "https://www.googleapis.com/auth/calendar",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const encoder = new TextEncoder();
  const headerB64 = btoa(JSON.stringify(header))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
  const payloadB64 = btoa(JSON.stringify(payload))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

  const message = `${headerB64}.${payloadB64}`;
  
  // Import the private key
  const pemHeader = "-----BEGIN PRIVATE KEY-----";
  const pemFooter = "-----END PRIVATE KEY-----";
  const pemContents = credentials.private_key
    .replace(pemHeader, "")
    .replace(pemFooter, "")
    .replace(/\s/g, "");
  
  const binaryDer = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0));
  
  const key = await crypto.subtle.importKey(
    "pkcs8",
    binaryDer,
    {
      name: "RSASSA-PKCS1-v1_5",
      hash: "SHA-256",
    },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    encoder.encode(message)
  );

  const signatureB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

  return `${message}.${signatureB64}`;
}

async function getAccessToken(credentials: GoogleCredentials): Promise<string> {
  const jwt = await createJWT(credentials);
  
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    console.error("Error getting access token:", data);
    throw new Error(`Failed to get access token: ${data.error}`);
  }
  
  return data.access_token;
}

async function getAvailableSlots(
  accessToken: string,
  calendarId: string
): Promise<AvailableSlot[]> {
  const now = new Date();
  const twoWeeksLater = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
    calendarId
  )}/events?timeMin=${now.toISOString()}&timeMax=${twoWeeksLater.toISOString()}&q=available%20for%20booking&singleEvents=true&orderBy=startTime`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  
  if (!response.ok) {
    console.error("Error fetching calendar events:", data);
    throw new Error(`Failed to fetch calendar events: ${data.error?.message}`);
  }

  return (data.items || []).map((event: any) => ({
    id: event.id,
    start: event.start.dateTime,
    end: event.end.dateTime,
  }));
}

async function bookSlot(
  accessToken: string,
  calendarId: string,
  booking: BookingRequest,
  originalEvent: any,
  supabaseClient: any
): Promise<void> {
  const startTime = new Date(booking.slotStart);
  const endTime = new Date(startTime.getTime() + booking.duration * 60 * 1000);

  // Create the booking event without automatic invites (to avoid Domain-Wide Delegation requirement)
  const bookingEvent = {
    summary: `Consultation with ${booking.attendeeName}`,
    description: `${booking.duration}-minute consultation booked via website\n\nAttendee Details:\nName: ${booking.attendeeName}\nEmail: ${booking.attendeeEmail}\n\nDiscussion Topic:\n${booking.description}${booking.attachmentPath ? '\n\nAttachment: See email for details' : ''}\n\n⚠️ Action Required: Please manually send a calendar invite to ${booking.attendeeEmail}`,
    start: {
      dateTime: startTime.toISOString(),
      timeZone: originalEvent.start.timeZone || "Europe/Amsterdam",
    },
    end: {
      dateTime: endTime.toISOString(),
      timeZone: originalEvent.end.timeZone || "Europe/Amsterdam",
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 30 },
      ],
    },
  };

  const createResponse = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
      calendarId
    )}/events`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingEvent),
    }
  );

  if (!createResponse.ok) {
    const error = await createResponse.json();
    console.error("Error creating booking event:", error);
    throw new Error(`Failed to create booking: ${error.error?.message}`);
  }

  // Update the original "available for booking" slot
  const remainingStart = endTime;
  const remainingEnd = new Date(originalEvent.end.dateTime);

  if (remainingEnd > remainingStart) {
    // Update the original event to start after the booking
    const updateResponse = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
        calendarId
      )}/events/${booking.slotId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start: {
            dateTime: remainingStart.toISOString(),
            timeZone: originalEvent.start.timeZone || "Europe/Amsterdam",
          },
        }),
      }
    );

    if (!updateResponse.ok) {
      console.error("Warning: Could not update original slot");
    }
  } else {
    // Delete the original event if fully booked
    await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
        calendarId
      )}/events/${booking.slotId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }

  // Send emails
  const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
  
  // Get attachment if provided
  let attachmentData = null;
  if (booking.attachmentPath) {
    try {
      const { data: fileData, error: downloadError } = await supabaseClient.storage
        .from('booking-attachments')
        .download(booking.attachmentPath);
      
      if (!downloadError && fileData) {
        const buffer = await fileData.arrayBuffer();
        const uint8Array = new Uint8Array(buffer);
        const base64 = btoa(String.fromCharCode(...uint8Array));
        attachmentData = {
          filename: booking.attachmentPath.split('/').pop() || 'attachment',
          content: base64,
        };
      }
    } catch (error) {
      console.error("Error downloading attachment:", error);
    }
  }

  // Create .ics calendar file
  const formatICSDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Goswijn Thijssen//Booking System//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `DTSTART:${formatICSDate(startTime)}`,
    `DTEND:${formatICSDate(endTime)}`,
    `DTSTAMP:${formatICSDate(new Date())}`,
    `ORGANIZER;CN=Goswijn Thijssen:mailto:goswijn.thijssen@gmail.com`,
    `ATTENDEE;CN=${booking.attendeeName};RSVP=TRUE:mailto:${booking.attendeeEmail}`,
    `SUMMARY:Consultation with Goswijn Thijssen`,
    `DESCRIPTION:${booking.description.replace(/\n/g, '\\n')}`,
    `LOCATION:Online`,
    `STATUS:CONFIRMED`,
    `SEQUENCE:0`,
    `UID:${booking.slotId}-${Date.now()}@booking.goswijn.com`,
    'BEGIN:VALARM',
    'TRIGGER:-PT30M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Meeting in 30 minutes',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  // Send confirmation email to booker with calendar invite
  try {
    const emailAttachments: any[] = [{
      filename: 'meeting.ics',
      content: btoa(icsContent),
    }];

    await resend.emails.send({
      from: "Goswijn Thijssen <onboarding@resend.dev>",
      to: [booking.attendeeEmail],
      subject: "Booking Confirmation - Consultation with Goswijn Thijssen",
      html: `
        <h1>Booking Confirmed!</h1>
        <p>Dear ${booking.attendeeName},</p>
        <p>Your ${booking.duration}-minute consultation has been confirmed.</p>
        <p><strong>Date & Time:</strong> ${new Date(startTime).toLocaleString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZone: originalEvent.start.timeZone || 'Europe/Amsterdam'
        })}</p>
        <p><strong>Discussion Topic:</strong> ${booking.description}</p>
        <p><strong>📅 Calendar Invite:</strong> A calendar invite is attached to this email. Click on it to add the meeting to your calendar.</p>
        <p>Looking forward to our conversation!</p>
        <p>Best regards,<br>Goswijn Thijssen</p>
      `,
      attachments: emailAttachments,
    });
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }

  // Send notification email to Goswijn with attachment
  try {
    const emailPayload: any = {
      from: "Booking System <onboarding@resend.dev>",
      to: ["goswijn.thijssen@gmail.com"],
      subject: `New Booking: ${booking.attendeeName} - ${new Date(startTime).toLocaleDateString()}`,
      html: `
        <h1>New Consultation Booking</h1>
        <p><strong>Name:</strong> ${booking.attendeeName}</p>
        <p><strong>Email:</strong> ${booking.attendeeEmail}</p>
        <p><strong>Date & Time:</strong> ${new Date(startTime).toLocaleString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZone: originalEvent.start.timeZone || 'Europe/Amsterdam'
        })}</p>
        <p><strong>Duration:</strong> ${booking.duration} minutes</p>
        <p><strong>Discussion Topic:</strong></p>
        <p>${booking.description.replace(/\n/g, '<br>')}</p>
        ${booking.attachmentPath ? '<p><strong>Attachment included in this email</strong></p>' : ''}
        <p>The booking has been added to your calendar. Please send a calendar invite to ${booking.attendeeEmail}</p>
      `,
    };

    if (attachmentData) {
      emailPayload.attachments = [attachmentData];
    }

    await resend.emails.send(emailPayload);
  } catch (error) {
    console.error("Error sending notification email:", error);
  }
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const credentialsJson = Deno.env.get("GOOGLE_CALENDAR_CREDENTIALS");
    if (!credentialsJson) {
      throw new Error("Google Calendar credentials not configured");
    }

    const credentials: GoogleCredentials = JSON.parse(credentialsJson);
    const calendarId = "goswijn.thijssen@gmail.com";
    
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );
    
    const accessToken = await getAccessToken(credentials);
    const url = new URL(req.url);
    
    if (url.pathname.endsWith("/available-slots")) {
      const slots = await getAvailableSlots(accessToken, calendarId);
      
      return new Response(JSON.stringify({ slots }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }
    
    if (url.pathname.endsWith("/book") && req.method === "POST") {
      const booking: BookingRequest = await req.json();
      
      // Validate input
      if (!booking.attendeeEmail || !booking.attendeeName || !booking.slotId || !booking.duration || !booking.slotStart || !booking.description) {
        throw new Error("Missing required booking information");
      }
      
      // Get the original event details
      const eventResponse = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
          calendarId
        )}/events/${booking.slotId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      
      if (!eventResponse.ok) {
        throw new Error("Slot not found or no longer available");
      }
      
      const originalEvent = await eventResponse.json();
      
      await bookSlot(accessToken, calendarId, booking, originalEvent, supabaseClient);
      
      return new Response(
        JSON.stringify({ success: true, message: "Booking confirmed! The appointment has been added to the calendar. You will be contacted shortly with meeting details." }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }
    
    return new Response(JSON.stringify({ error: "Invalid endpoint" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in calendar-booking function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

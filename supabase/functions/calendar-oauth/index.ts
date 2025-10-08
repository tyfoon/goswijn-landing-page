import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  try {
    const url = new URL(req.url);
    const path = url.pathname;

    // Initialize OAuth flow
    if (path.endsWith("/init")) {
      const clientId = Deno.env.get("GOOGLE_OAUTH_CLIENT_ID");
      const redirectUri = `${Deno.env.get("SUPABASE_URL")}/functions/v1/calendar-oauth/callback`;
      
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${clientId}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `response_type=code&` +
        `scope=${encodeURIComponent("https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events")}&` +
        `access_type=offline&` +
        `prompt=consent`;

      return new Response(JSON.stringify({ authUrl }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Handle OAuth callback
    if (path.endsWith("/callback")) {
      const code = url.searchParams.get("code");
      
      if (!code) {
        return new Response("No authorization code provided", { status: 400 });
      }

      const clientId = Deno.env.get("GOOGLE_OAUTH_CLIENT_ID");
      const clientSecret = Deno.env.get("GOOGLE_OAUTH_CLIENT_SECRET");
      const redirectUri = `${Deno.env.get("SUPABASE_URL")}/functions/v1/calendar-oauth/callback`;

      // Exchange code for tokens
      const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          code,
          client_id: clientId!,
          client_secret: clientSecret!,
          redirect_uri: redirectUri,
          grant_type: "authorization_code",
        }),
      });

      const tokens = await tokenResponse.json();
      console.log("OAuth tokens received:", { hasRefreshToken: !!tokens.refresh_token });

      if (tokens.error) {
        console.error("OAuth error:", tokens);
        return new Response(`OAuth error: ${tokens.error_description}`, { status: 400 });
      }

      // Store tokens in database (you'll need to create this table)
      const { error: dbError } = await supabaseClient
        .from("google_oauth_tokens")
        .upsert({
          id: "main_calendar", // Single row for the main calendar account
          refresh_token: tokens.refresh_token,
          access_token: tokens.access_token,
          expires_at: new Date(Date.now() + tokens.expires_in * 1000).toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (dbError) {
        console.error("Error storing tokens:", dbError);
        return new Response(`Error storing tokens: ${dbError.message}`, { status: 500 });
      }

      // Redirect to success page
      return new Response(
        `<html><body><h1>Authorization Successful!</h1><p>You can close this window and return to the app.</p><script>window.close();</script></body></html>`,
        { headers: { "Content-Type": "text/html" } }
      );
    }

    // Get current access token (refresh if needed)
    if (path.endsWith("/token")) {
      const { data: tokenData, error: fetchError } = await supabaseClient
        .from("google_oauth_tokens")
        .select("*")
        .eq("id", "main_calendar")
        .maybeSingle();

      if (fetchError || !tokenData) {
        return new Response(JSON.stringify({ error: "No tokens found. Please authorize first." }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 404,
        });
      }

      // Check if token needs refresh
      const expiresAt = new Date(tokenData.expires_at);
      const now = new Date();
      
      if (expiresAt <= now) {
        console.log("Token expired, refreshing...");
        
        const clientId = Deno.env.get("GOOGLE_OAUTH_CLIENT_ID");
        const clientSecret = Deno.env.get("GOOGLE_OAUTH_CLIENT_SECRET");

        const refreshResponse = await fetch("https://oauth2.googleapis.com/token", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client_id: clientId!,
            client_secret: clientSecret!,
            refresh_token: tokenData.refresh_token,
            grant_type: "refresh_token",
          }),
        });

        const newTokens = await refreshResponse.json();
        
        if (newTokens.error) {
          console.error("Token refresh error:", newTokens);
          return new Response(JSON.stringify({ error: "Token refresh failed" }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 401,
          });
        }

        // Update stored tokens
        await supabaseClient
          .from("google_oauth_tokens")
          .update({
            access_token: newTokens.access_token,
            expires_at: new Date(Date.now() + newTokens.expires_in * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("id", "main_calendar");

        return new Response(JSON.stringify({ access_token: newTokens.access_token }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }

      return new Response(JSON.stringify({ access_token: tokenData.access_token }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    return new Response("Not found", { status: 404 });
  } catch (error: any) {
    console.error("Error in calendar-oauth function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Calendar, Loader2, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { SkeletonLoader } from "./SkeletonLoader";

interface TimeSlot {
  id: string;
  start: string;
  end: string;
  originalSlotId?: string;
}

export const BookingSection = () => {
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [attendeeName, setAttendeeName] = useState("");
  const [attendeeEmail, setAttendeeEmail] = useState("");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const bookingOptions = [
    {
      duration: 30,
      price: "€200",
      description: "Quick consultation for focused discussions",
    },
    {
      duration: 60,
      price: "€400",
      description: "In-depth strategy session",
    },
  ];

  useEffect(() => {
    if (isDialogOpen && selectedDuration) {
      fetchAvailableSlots();
    }
  }, [isDialogOpen, selectedDuration]);

  const fetchAvailableSlots = async () => {
    setIsLoadingSlots(true);
    try {
      const { data, error } = await supabase.functions.invoke(
        "calendar-booking/available-slots"
      );

      if (error) throw error;

      setAvailableSlots(data.slots || []);
    } catch (error: any) {
      console.error("Error fetching slots:", error);
      toast({
        title: "Error",
        description: "Failed to load available time slots. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingSlots(false);
    }
  };

  const handleBookNow = (duration: number) => {
    setSelectedDuration(duration);
    setIsDialogOpen(true);
    setSelectedSlot(null);
    setAttendeeName("");
    setAttendeeEmail("");
    setDescription("");
    setAttachment(null);
  };

  const handleBooking = async () => {
    if (!selectedSlot || !attendeeName || !attendeeEmail || !selectedDuration || !description) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields and select a time slot",
        variant: "destructive",
      });
      return;
    }

    setIsBooking(true);
    try {
      let attachmentPath = null;

      // Upload attachment if provided
      if (attachment) {
        const fileExt = attachment.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('booking-attachments')
          .upload(filePath, attachment);

        if (uploadError) throw uploadError;
        attachmentPath = filePath;
      }

      const { data, error } = await supabase.functions.invoke(
        "calendar-booking/book",
        {
          body: {
            slotId: selectedSlot.originalSlotId || selectedSlot.id,
            slotStart: selectedSlot.start,
            duration: selectedDuration,
            attendeeEmail,
            attendeeName,
            description,
            attachmentPath,
          },
        }
      );

      if (error) throw error;

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setIsDialogOpen(false);
      }, 2000);

      toast({
        title: "Booking confirmed!",
        description: data.message || "You will receive a confirmation email shortly.",
      });
    } catch (error: any) {
      console.error("Error booking slot:", error);
      toast({
        title: "Booking failed",
        description: error.message || "Failed to complete booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsBooking(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getAvailableSlotsForDuration = () => {
    if (!selectedDuration) return [];
    
    const slots: TimeSlot[] = [];
    
    availableSlots.forEach(slot => {
      const start = new Date(slot.start);
      const end = new Date(slot.end);
      const slotDuration = (end.getTime() - start.getTime()) / (1000 * 60);
      
      // Generate multiple slots if the available time is longer than the booking duration
      const numberOfSlots = Math.floor(slotDuration / selectedDuration);
      
      for (let i = 0; i < numberOfSlots; i++) {
        const slotStart = new Date(start.getTime() + (i * selectedDuration * 60 * 1000));
        const slotEnd = new Date(slotStart.getTime() + (selectedDuration * 60 * 1000));
        
        slots.push({
          id: `${slot.id}_slot${i}`,
          start: slotStart.toISOString(),
          end: slotEnd.toISOString(),
          originalSlotId: slot.id,
        });
      }
    });
    
    return slots;
  };

  return (
    <>
      <div className="space-y-6">
        {bookingOptions.map((option, index) => (
          <Card
            key={option.duration}
            onClick={() => handleBookNow(option.duration)}
            className="group p-6 bg-background/50 backdrop-blur-sm border-border/50 hover:border-foreground/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-on-scroll"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between gap-6">
              <div className="flex items-center gap-4 flex-1">
                <div className="p-3 rounded-full bg-muted group-hover:bg-foreground/10 transition-colors duration-300">
                  <Clock className="h-6 w-6 text-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-foreground/80 transition-colors">
                    {option.duration} minutes
                  </h3>
                  <p className="text-foreground/70 text-sm">{option.description}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-4">
                <p className="text-2xl font-bold text-foreground">{option.price}</p>
                <Button
                  size="lg"
                  className="whitespace-nowrap shadow-md hover:shadow-xl transition-all duration-300 pointer-events-none"
                >
                  Book Now
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Book a {selectedDuration}-minute consultation</DialogTitle>
            <DialogDescription>
              Fill in your details and select a time slot for your consultation.
            </DialogDescription>
          </DialogHeader>

          {showSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 animate-success-pop">
              <CheckCircle2 className="h-16 w-16 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h3>
              <p className="text-foreground/70">Check your email for details</p>
            </div>
          ) : (
            <div className="space-y-6 mt-4">
            <div className="space-y-4">
              <Label>Your Information</Label>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={attendeeName}
                    onChange={(e) => setAttendeeName(e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={attendeeEmail}
                    onChange={(e) => setAttendeeEmail(e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="description">What would you like to discuss?</Label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of what you'd like to talk about..."
                    className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  />
                </div>
                <div>
                  <Label htmlFor="attachment">Attachment (optional)</Label>
                  <Input
                    id="attachment"
                    type="file"
                    onChange={(e) => setAttachment(e.target.files?.[0] || null)}
                    className="cursor-pointer"
                  />
                  {attachment && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Selected: {attachment.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Select a Time Slot</Label>
              {isLoadingSlots ? (
                <SkeletonLoader />
              ) : getAvailableSlotsForDuration().length === 0 ? (
                <div className="text-center py-8 px-4 bg-muted/50 rounded-lg">
                  <p className="text-foreground/70">
                    No available slots found. Please try again later or choose a different duration.
                  </p>
                </div>
              ) : (
                <div className="grid gap-3">
                  {getAvailableSlotsForDuration().map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => setSelectedSlot(slot)}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                        selectedSlot?.id === slot.id
                          ? "border-foreground bg-foreground/5 shadow-md scale-[1.02]"
                          : "border-border hover:border-foreground/40 hover:shadow-sm hover:scale-[1.01]"
                      }`}
                    >
                      <Calendar className="h-5 w-5 text-foreground flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground">
                          {formatDate(slot.start)}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button
              onClick={handleBooking}
              disabled={!selectedSlot || !attendeeName || !attendeeEmail || !description || isBooking}
              className="w-full shadow-md hover:shadow-lg transition-all duration-300"
              size="lg"
            >
              {isBooking ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Booking...
                </>
              ) : (
                "Confirm Booking"
              )}
            </Button>
          </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

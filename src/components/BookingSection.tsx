import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Calendar, Loader2, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { SkeletonLoader } from "./SkeletonLoader";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";

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
  const [currentWeekStart, setCurrentWeekStart] = useState(() => startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
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
    setSelectedDay(null);
    setShowConfirmation(false);
    setAttendeeName("");
    setAttendeeEmail("");
    setDescription("");
    setAttachment(null);
    setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }));
  };

  const handleSlotSelection = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setShowConfirmation(true);
  };

  const handleConfirmBooking = () => {
    setShowConfirmation(false);
    handleBooking();
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

  const formatTime24h = (dateString: string) => {
    return format(new Date(dateString), "HH:mm");
  };

  const getWorkDays = () => {
    const days = [];
    for (let i = 0; i < 5; i++) {
      days.push(addDays(currentWeekStart, i));
    }
    return days;
  };

  const getDaySlotsCount = (day: Date) => {
    return getAvailableSlotsForDuration().filter(slot => 
      isSameDay(new Date(slot.start), day)
    ).length;
  };

  const getSlotsForDay = (day: Date) => {
    return getAvailableSlotsForDuration().filter(slot => 
      isSameDay(new Date(slot.start), day)
    );
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentWeekStart(prev => addDays(prev, direction === 'next' ? 7 : -7));
    setSelectedDay(null);
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
              <Label>Select a Day</Label>
              {isLoadingSlots ? (
                <SkeletonLoader />
              ) : (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => navigateWeek('prev')}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium">
                      {format(currentWeekStart, 'MMM d')} - {format(addDays(currentWeekStart, 4), 'MMM d, yyyy')}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => navigateWeek('next')}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {getWorkDays().map((day) => {
                      const slotsCount = getDaySlotsCount(day);
                      const hasSlots = slotsCount > 0;
                      const isSelected = selectedDay && isSameDay(day, selectedDay);

                      return (
                        <button
                          key={day.toISOString()}
                          onClick={() => hasSlots && setSelectedDay(day)}
                          disabled={!hasSlots}
                          className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                            isSelected
                              ? "border-foreground bg-foreground/10 shadow-md"
                              : hasSlots
                              ? "border-green-500 bg-green-500/10 hover:bg-green-500/20 cursor-pointer"
                              : "border-border bg-muted/30 cursor-not-allowed opacity-50"
                          }`}
                        >
                          <div className="text-xs font-medium mb-1">
                            {format(day, 'EEE')}
                          </div>
                          <div className="text-lg font-bold">
                            {format(day, 'd')}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {selectedDay && (
                    <div className="space-y-2 mt-4">
                      <Label>Available Times</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {getSlotsForDay(selectedDay).map((slot) => (
                          <button
                            key={slot.id}
                            onClick={() => handleSlotSelection(slot)}
                            className="p-3 rounded-lg border-2 border-border hover:border-foreground/40 hover:bg-foreground/5 transition-all duration-300 text-center font-medium"
                          >
                            {formatTime24h(slot.start)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Your Booking</DialogTitle>
            <DialogDescription>
              Please review your booking details
            </DialogDescription>
          </DialogHeader>
          
          {selectedSlot && (
            <div className="space-y-4 py-4">
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Date:</span>
                  <span className="font-medium">{format(new Date(selectedSlot.start), 'EEEE, MMMM d, yyyy')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Time:</span>
                  <span className="font-medium">{formatTime24h(selectedSlot.start)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Duration:</span>
                  <span className="font-medium">{selectedDuration} minutes</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmBooking}
                  disabled={isBooking}
                  className="flex-1"
                >
                  {isBooking ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    "Confirm"
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

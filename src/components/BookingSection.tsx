import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

export const BookingSection = () => {
  const bookingOptions = [
    {
      duration: "30 minutes",
      price: "€200",
      description: "Quick consultation for focused discussions",
    },
    {
      duration: "60 minutes",
      price: "€400",
      description: "In-depth strategy session",
    },
  ];

  return (
    <div className="space-y-6">
      {bookingOptions.map((option) => (
        <Card
          key={option.duration}
          className="p-6 bg-background/50 backdrop-blur-sm border-foreground/20 hover:border-foreground/40 transition-all"
        >
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4 flex-1">
              <Clock className="h-8 w-8 text-foreground flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {option.duration}
                </h3>
                <p className="text-foreground/70 text-sm">{option.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <p className="text-2xl font-bold text-foreground">{option.price}</p>
              <Button size="lg" className="whitespace-nowrap">
                Book Now
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

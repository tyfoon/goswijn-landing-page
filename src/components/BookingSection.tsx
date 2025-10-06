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
    <div className="grid md:grid-cols-2 gap-8">
      {bookingOptions.map((option) => (
        <Card
          key={option.duration}
          className="p-8 bg-background/50 backdrop-blur-sm border-foreground/20 hover:border-foreground/40 transition-all"
        >
          <div className="flex items-start gap-4 mb-4">
            <Clock className="h-8 w-8 text-foreground mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {option.duration}
              </h3>
              <p className="text-foreground/70 mb-4">{option.description}</p>
            </div>
          </div>
          <div className="mb-6">
            <p className="text-3xl font-bold text-foreground">{option.price}</p>
          </div>
          <Button className="w-full" size="lg">
            Book Now
          </Button>
        </Card>
      ))}
    </div>
  );
};

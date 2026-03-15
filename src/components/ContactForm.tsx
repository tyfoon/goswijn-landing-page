import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FileText } from "lucide-react";

export const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRequestingCV, setIsRequestingCV] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRequestCV = async () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      toast({
        title: "Required fields",
        description: "Please fill in your name and email above first.",
        variant: "destructive",
      });
      return;
    }

    setIsRequestingCV(true);

    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: formData.name,
          email: formData.email,
          message: `[CV/Resume Request] ${formData.name} (${formData.email}) has requested your full CV/Resume.`,
        },
      });

      if (error) throw error;

      toast({
        title: "CV requested!",
        description: "I'll send you my full CV/Resume shortly.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to request CV. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRequestingCV(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Input
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="bg-background/50 backdrop-blur-sm border-foreground/20"
        />
      </div>
      <div>
        <Input
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="bg-background/50 backdrop-blur-sm border-foreground/20"
        />
      </div>
      <div>
        <Textarea
          placeholder="Your Message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          rows={6}
          className="bg-background/50 backdrop-blur-sm border-foreground/20"
        />
      </div>
      <div className="space-y-3">
        <Button
          type="submit"
          disabled={isSubmitting}
          size="lg"
          className="w-full shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isRequestingCV}
          onClick={handleRequestCV}
          className="w-full text-xs gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
        >
          <FileText className="h-3.5 w-3.5" />
          {isRequestingCV ? "Requesting..." : "Request Full CV / Resume"}
        </Button>
      </div>
    </form>
  );
};

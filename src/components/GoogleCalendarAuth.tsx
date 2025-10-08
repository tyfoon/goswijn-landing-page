import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Calendar, Check, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const GoogleCalendarAuth = () => {
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { toast } = useToast();

  // Check auth status on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("calendar-oauth/token");
      
      if (!error && data?.access_token) {
        setIsAuthorized(true);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const handleAuthorize = async () => {
    setIsAuthorizing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("calendar-oauth/init");
      
      if (error) throw error;
      
      if (data?.authUrl) {
        // Open OAuth flow in popup
        const width = 600;
        const height = 700;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;
        
        const popup = window.open(
          data.authUrl,
          "Google Calendar Authorization",
          `width=${width},height=${height},left=${left},top=${top}`
        );

        // Poll for completion
        const checkPopup = setInterval(async () => {
          if (popup?.closed) {
            clearInterval(checkPopup);
            setIsAuthorizing(false);
            
            // Check if authorization was successful
            const authorized = await checkAuthStatus();
            if (authorized) {
              toast({
                title: "Success!",
                description: "Google Calendar has been authorized successfully.",
              });
            }
          }
        }, 500);
      }
    } catch (error: any) {
      console.error("Authorization error:", error);
      toast({
        variant: "destructive",
        title: "Authorization Failed",
        description: error.message || "Failed to authorize Google Calendar",
      });
      setIsAuthorizing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Google Calendar Integration
        </CardTitle>
        <CardDescription>
          Connect your Google Calendar to send calendar invites to clients
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isAuthorized ? (
          <div className="flex items-center gap-2 text-green-600">
            <Check className="h-5 w-5" />
            <span>Google Calendar is connected</span>
          </div>
        ) : (
          <Button
            onClick={handleAuthorize}
            disabled={isAuthorizing}
            className="w-full sm:w-auto"
          >
            {isAuthorizing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Authorizing...
              </>
            ) : (
              <>
                <Calendar className="mr-2 h-4 w-4" />
                Connect Google Calendar
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

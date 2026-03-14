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
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.data?.type === "google-oauth-callback" && event.data?.success) {
        setIsAuthorizing(false);
        const authorized = await checkAuthStatus();
        if (authorized) {
          toast({
            title: "Success!",
            description: "Google Calendar has been authorized successfully.",
          });
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [toast]);

  const handleAuthorize = async () => {
    setIsAuthorizing(true);

    try {
      const { data, error } = await supabase.functions.invoke("calendar-oauth/init");

      if (error) throw error;

      if (data?.authUrl) {
        const width = 600;
        const height = 700;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;

        window.open(
          data.authUrl,
          "Google Calendar Authorization",
          `width=${width},height=${height},left=${left},top=${top}`
        );
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to authorize Google Calendar";
      console.error("Authorization error:", error);
      toast({
        variant: "destructive",
        title: "Authorization Failed",
        description: message,
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

import { supabase } from "@/integrations/supabase/client";

// Get or create a guest ID from localStorage
export const getGuestId = (): string => {
  const storageKey = "cartgpt_guest_id";
  let guestId = localStorage.getItem(storageKey);
  
  if (!guestId) {
    guestId = crypto.randomUUID();
    localStorage.setItem(storageKey, guestId);
  }
  
  return guestId;
};

// Track events - only records unique views per day per guest
export const trackEvent = async (eventName: string): Promise<void> => {
  try {
    const guestId = getGuestId();
    
    // Insert the event - the unique constraint will prevent duplicates per day
    const { error } = await supabase
      .from("user_events")
      .insert({
        guest_id: guestId,
        event_name: eventName,
      });
    
    // Ignore unique constraint violation (already tracked today)
    if (error && error.code !== "23505") {
      console.error("Analytics tracking error:", error);
    }
  } catch (err) {
    // Silently fail - analytics should not break the app
    console.error("Analytics error:", err);
  }
};

// Event names as constants for consistency
export const EVENTS = {
  LANDING_PAGE: "landing page",
  VIDEO: "video",
  EXPLANATION: "explanation",
  REVIEWS: "reviews",
  BUTTON: "button",
  WAITING_LIST: "waiting list",
} as const;

export type EventName = typeof EVENTS[keyof typeof EVENTS];

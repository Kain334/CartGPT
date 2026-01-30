import { useEffect, useRef } from "react";
import { trackEvent, EventName } from "@/lib/analytics";

// Hook to track an event once when component mounts
export const useTrackPageView = (eventName: EventName) => {
  const tracked = useRef(false);
  
  useEffect(() => {
    if (!tracked.current) {
      tracked.current = true;
      trackEvent(eventName);
    }
  }, [eventName]);
};

// Hook to track when element enters viewport
export const useTrackOnView = (eventName: EventName) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const tracked = useRef(false);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element || tracked.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !tracked.current) {
            tracked.current = true;
            trackEvent(eventName);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    
    observer.observe(element);
    
    return () => observer.disconnect();
  }, [eventName]);
  
  return elementRef;
};

// Hook to track video engagement
export const useTrackVideo = (eventName: EventName) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tracked = useRef(false);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container || tracked.current) return;
    
    // Track when video container enters viewport (YouTube embeds don't give us play events)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !tracked.current) {
            tracked.current = true;
            trackEvent(eventName);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.7 }
    );
    
    observer.observe(container);
    
    return () => observer.disconnect();
  }, [eventName]);
  
  return containerRef;
};

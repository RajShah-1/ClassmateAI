import { useEffect, useRef } from "react";
import { usePathname, useGlobalSearchParams, Slot } from "expo-router";
import { getAnalytics, logEvent } from '@react-native-firebase/analytics';
import { getApp } from "@react-native-firebase/app";

export default function Layout() {
  const pathname = usePathname();
  const params = useGlobalSearchParams();
  const startTimeRef = useRef<number | null>(null);
  const previousPathRef = useRef<string | null>(null);

  useEffect(() => {
    const now = Date.now();

    if (previousPathRef.current && startTimeRef.current !== null) {
      const timeSpent = (now - startTimeRef.current) / 1000;
      const app = getApp();
      const analytics = getAnalytics(app);
      logEvent(analytics, 'screen_time_spent', {
        screen_name: previousPathRef.current,
        duration_seconds: timeSpent,
      });
    }

    if (pathname) {
      previousPathRef.current = pathname;
      startTimeRef.current = now;

      const app = getApp();
      const analytics = getAnalytics(app);
      console.log('Logging screen view:', pathname, params);

      logEvent(analytics, 'app_screen_view', {
        screen_name: pathname,
        screen_class: pathname,
      });
    }

    // Report the last open screen
    return () => {
      if (pathname && startTimeRef.current !== null) {
        const duration = (Date.now() - startTimeRef.current) / 1000;
        const app = getApp();
        const analytics = getAnalytics(app);
        logEvent(analytics, 'screen_time_spent', {
          screen_name: pathname,
          duration_seconds: duration,
        });
      }
    };
  }, [pathname, params]);

  return <Slot />;
}

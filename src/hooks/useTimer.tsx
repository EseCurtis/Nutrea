import { useEffect, useRef, useState } from "react";

export function useTimer() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("00:00:00");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        if (startDate) {
          const now = new Date();
          const timeDiff = Math.floor(
            (now.getTime() - startDate.getTime()) / 1000
          ); // Calculate time difference in seconds

          const hours = Math.floor(timeDiff / 3600);
          const minutes = Math.floor((timeDiff % 3600) / 60);
          const seconds = timeDiff % 60;

          // Format the time components as strings with leading zeros
          const formattedHours = String(hours).padStart(2, "0");
          const formattedMinutes = String(minutes).padStart(2, "0");
          const formattedSeconds = String(seconds).padStart(2, "0");

          setCurrentTime(
            `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
          );
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, startDate]);

  const startTimer = (customStartDate?: Date) => {
    if (customStartDate) {
      setStartDate(customStartDate);
    } else {
      setStartDate(new Date());
    }
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setCurrentTime("00:00:00");
    setStartDate(null); // Reset the start date when stopping the timer
  };

  return {
    currentTime,
    isRunning,
    startTimer,
    pauseTimer,
    stopTimer,
  };
}

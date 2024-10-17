import { useState, useEffect } from "react";
import { WorkoutStore } from "../store/WorkoutStore";

export const useStopTimer = (
  isStart: boolean,
  onTimeChange?: (time: string) => void
): string => {
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isStart) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          onTimeChange && onTimeChange(formatTime(prevTime + 1));
          return prevTime + 1;
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isStart]);

  // Convert seconds to "HH:MM:SS" format
  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    return formattedTime;
  };

  return formatTime(time);
};

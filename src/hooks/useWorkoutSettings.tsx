import { useEffect } from "react";
import { WorkoutSettings, WorkoutStore } from "../store/WorkoutStore";
import { useStorage } from "./useStorage";

export function useWorkoutSettings() {
  const { workoutSettings } = WorkoutStore.useState((s) => s);
  const { save, get } = useStorage();

  const setWorkoutSettings = async (settings: WorkoutSettings) => {
    WorkoutStore.update((s) => {
      s.workoutSettings = settings;
    });
    await save("workoutSettingsKey", JSON.stringify(settings));
  };

  useEffect(() => {
    const loadWorkoutSettings = async () => {
      const settings = await get("workoutSettingsKey");
      if (settings) {
        const parsedSettings = JSON.parse(settings);
        setWorkoutSettings(parsedSettings);
      }
    };
    loadWorkoutSettings();
  }, []);

  return {
    workoutSettings,
    setWorkoutSettings,
  };
}

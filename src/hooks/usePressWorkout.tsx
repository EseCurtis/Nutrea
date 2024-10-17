import { LocationStore } from "../store/LocationStore";
import { WorkoutStore } from "../store/WorkoutStore";

export function usePressWorkout() {
  const { latitude, longitude } = LocationStore.useState((s) => s);

  const press = () => {
    WorkoutStore.update((s) => {
      s.mode = "daily";
    });

    if (!latitude || !longitude) {
      return false;
    } else {
      return true;
    }
  };

  return {
    press,
  };
}

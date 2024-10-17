import HealthKit from "../services/HealthKit";
import { AuthStore } from "../store/AuthStore";
import moment from "moment";
import { useSaveWorkout } from "./api/run/useSaveWorkout";
import { useEffectOnceWhen } from "rooks";
import { useGetLastWorkout } from "./api/dashboard/useGetLastWorkout";
import { isIos } from "../utils";

export function useWorkoutActivity() {
  const { user } = AuthStore.useState((s) => s);
  const { mutate } = useSaveWorkout({
    onError: () => {},
  });

  const { data, isLoading, refetch } = useGetLastWorkout();
  const lastWorkout = data?.data;

  const syncWorkouts = async () => {
    if (isIos) {
      const healthkit = new HealthKit();
      const date =
        lastWorkout?.stopped_at ??
        new Date(moment(user?.created_at).startOf("day").toISOString());

      const workouts = await healthkit.getWorkoutSamples(date);

      if (workouts?.length > 0) {
        for (const workout of workouts) {
          const body = {
            source: "apple",
            type: workout.activityName,
            start_date: workout.start,
            end_date: workout.end,
            updated_date: workout.end,
            stopped_at: workout.end,
            calories: workout.calories?.toString(),
            energy_burned_unit: "calorie",
            steps: "0",
            heart_rate: "0",
            pace: "0",
            average_pace: "0",
            elevation: "0",
            distance_unit: "km",
            coordinates: [],
            distance: workout.distance.toString(),
            latitude: "0",
            longitude: "0",
            goal: "0",
            mode: "daily",
            activity_id: workout.activityId.toString(),
          };

          mutate(body);
        }

        refetch();
      }
    }
  };

  useEffectOnceWhen(() => {
    if (!isLoading) {
      syncWorkouts();
    }
  }, !isLoading);

  return {
    syncWorkouts,
  };
}

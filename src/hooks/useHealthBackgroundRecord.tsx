import HealthKit from "../services/HealthKit";
import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";
import { useEffect } from "react";
import { useLocation } from "./useLocation";
import { useUpdateUser } from "./useUpdateUser";
import { AuthStore } from "../store/AuthStore";
import moment from "moment";
import { isIOS } from "../utils/deviceInfo";
import axios from "axios";
import { baseUrl } from "../utils";
import * as SecureStore from "expo-secure-store";
import { tokenKey } from "./useAuth";
import { User } from "../types/User";
import { getErrorMessage } from "./api/useHandleError";

const HEALTH_DATA_TASK = "healthDataUpdate";
TaskManager.defineTask(HEALTH_DATA_TASK, async () => {
  const healthKit = new HealthKit();
  const isEnabled = await healthKit.isEnabled();
  const isPermitted = await healthKit.getAuthStatus();

  if (isEnabled && isPermitted) {
    await refreshWorkouts();
    await refreshHealthData();
  }

  // Be sure to return the successful result type!
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(HEALTH_DATA_TASK, {
    minimumInterval: 15 * 60, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(HEALTH_DATA_TASK);
}

export function useHealthBackgroundRecord() {
  // const { getLocation } = useLocation();
  const { user } = AuthStore.useState((s) => s);

  // useEffect(() => {
  //   (async () => {
  //     getLocation();
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      const status = await BackgroundFetch.getStatusAsync();
      if (status === BackgroundFetch.BackgroundFetchStatus.Available) {
        await registerBackgroundFetchAsync();
      }

      // if (status === BackgroundFetch.BackgroundFetchStatus.Denied) {
      //   await unregisterBackgroundFetchAsync();
      // }

      // if (status === BackgroundFetch.BackgroundFetchStatus.Restricted) {
      //   await unregisterBackgroundFetchAsync();
      // }
    })();
  }, []);

  const { updateUser } = useUpdateUser();

  // useEffect(() => {
  //   const handleAppStateChange = async (nextAppState: string) => {
  //     if (nextAppState === "active") {
  //       setTimeout(async () => {
  //         const healthKit = new HealthKit();
  //         const isEnabled = await healthKit.isEnabled();
  //         const isPermitted = await healthKit.getAuthStatus();

  //         if (isEnabled && isPermitted) {
  //           await refreshHealthData();
  //         }

  //         updateUser();
  //       }, 2000);
  //     }
  //   };
  //   const appStateSubscription = AppState.addEventListener(
  //     "change",
  //     handleAppStateChange
  //   );

  //   return () => {
  //     appStateSubscription.remove();
  //   };
  // }, []);

  return {};
}

export const refreshHealthData = async () => {
  try {
    await refreshWorkouts();
    await refreshStep();
    await refreshTimelyStep();
  } catch (error) {
    console.log("Error refreshing health data");
    console.warn(error);
  }
};

export const refreshStep = async () => {
  let isUpdating = false;

  try {
    if (isIOS) {
      if (isUpdating) {
        return;
      }

      isUpdating = true;

      const token = await SecureStore.getItemAsync(tokenKey);

      if (token) {
        const userRes = await axios.get(`${baseUrl}/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = userRes?.data?.data as User;
        const healthKit = new HealthKit();

        // const startOfDay = moment
        //   .utc(new Date(user.created_at))
        //   .startOf("day")
        //   .toDate();

        const healthData = await healthKit.getHealthData(
          new Date(user?.created_at)
        );

        const data = {
          total_steps: +Number(healthData?.totalSteps).toFixed(0),
          steps: +Number(healthData?.totalSteps).toFixed(0),
          total_calories: healthData?.totalCalories?.toString(),
        };
        console.log(data);

        // update the user
        await axios
          .put(`${baseUrl}/user/me`, data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            console.log("Health data updated");
          });
      }
    }
  } catch (error: any) {
    throw new Error(error);
  } finally {
    isUpdating = false;
  }
};

export const refreshTimelyStep = async () => {
  let isUpdating = false;

  try {
    // if (isIOS) {
    if (isUpdating) {
      return;
    }

    isUpdating = true;

    const token = await SecureStore.getItemAsync(tokenKey);

    if (token) {
      const startOfDay = moment.utc(new Date()).startOf("day").toDate();
      const endOfStartOfDay = moment.utc(new Date()).endOf("day").toDate();

      const healthKit = new HealthKit();
      const healthData = await healthKit.getHealthData(
        startOfDay,
        endOfStartOfDay
      );

      const data = {
        total_steps: +Number(healthData?.totalSteps).toFixed(0),
        steps: +Number(healthData?.totalSteps).toFixed(0),
        // distance: healthData.distance.toString(), no need to update distance
        calories: healthData?.totalCalories?.toString(),
      };
      // console.log(data);

      await SecureStore.setItemAsync(
        "last_daily_step_date",
        new Date().toISOString()
      );

      // update the user
      if (healthData?.steps) {
        await axios
          .post(`${baseUrl}/workout/daily-step-count`, data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            console.log("Daily step count registered");
          })
          .catch((er: any) => {
            console.log(getErrorMessage(er));
          });
      }
    }
    // }
  } catch (error: any) {
    throw new Error(error);
  } finally {
    isUpdating = false;
  }
};

export const refreshWorkouts = async () => {
  try {
    console.log("Refreshing workouts");

    if (isIOS) {
      const token = await SecureStore.getItemAsync(tokenKey);

      if (token) {
        const healthKit = new HealthKit();

        const last_synced_workout = await SecureStore.getItemAsync(
          "last_synced_workout"
        );

        const new_date = last_synced_workout
          ? moment(new Date(last_synced_workout)).toDate()
          : moment.utc(new Date()).startOf("day").toDate();

        const workouts = (await healthKit.getWorkoutSamples(new_date)) as any[];

        console.log(workouts.length, new_date, last_synced_workout);

        if (workouts?.length > 0) {
          console.log(`"New workout"`);

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
              activity_id: workout.id,
            };

            await axios
              .post(`${baseUrl}/workout`, body, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then(() => {
                console.log("Health data updated");
              })
              .catch((er) => {
                console.log("Error", er.response);
              });
          }

          await SecureStore.setItemAsync(
            "last_synced_workout",
            new Date().toISOString()
          );
        }
      }
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

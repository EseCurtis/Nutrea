import { useEffect, useState } from "react";
import { WorkoutStore } from "../store/WorkoutStore";
import HealthKit from "../services/HealthKit";
import { useLocation } from "./useLocation";
import { log } from "../utils/log";
import { calculatePace } from "../utils/calculateDistanceFromSteps";
import { AuthStore } from "../store/AuthStore";
import { Accelerometer, Pedometer } from "expo-sensors";
import { useStopTimer } from "./useStopTimer";
import { stepsToKilometers } from "../utils/stepsToKilometers";
import { calculateCaloriesBurnedByStepcount } from "../utils/calculateCaloriesBurned";
import { calculateCaloriesPerStep } from "../utils/calculateCaloriesPerStep";
import { useSaveWorkout } from "./api/run/useSaveWorkout";
import { useToast } from "../contexts/ToastProvider";
import { useSpeech } from "./useSpeech";
import { refreshTimelyStep } from "./useHealthBackgroundRecord";
import { isIos } from "../utils";

export function useWorkout(onDone?: () => void) {
  const workout = WorkoutStore.useState((s) => s);
  const { isStarted, isPaused, startDate, paused_intervals } = workout;
  const [currentStepCount, setCurrentStepCount] = useState(0);

  const [steps, setSteps] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [lastTimeStamp, setLastTimeStamp] = useState(0);
  const [loading, setLoading] = useState(false);
  const { startLocation, stopLocation, location } = useLocation();
  const { user } = AuthStore.useState((s) => s);
  const { mutateAsync } = useSaveWorkout();

  const healthKitService = new HealthKit();

  let calorieRate = calculateCaloriesPerStep(user!, 1.2);

  const { speak } = useSpeech();
  const time = useStopTimer(!isPaused, (time) => {
    WorkoutStore.update((s) => {
      s.time = time;
    });
  });
  const { show } = useToast();

  /**
   * Subscribes to the pedometer and watches for step count updates.
   *
   * @returns A subscription object that can be used to unsubscribe from the pedometer updates.
   */
  const subscribePendometer = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();

    if (isAvailable) {
      return Pedometer.watchStepCount(async (result) => {
        if (isStarted && !isPaused) {
          setCurrentStepCount(result.steps);
          await readHealthData(result.steps);
        }
      });
    }
  };
  const subscribeAccelerometer = async () => {
    // let subscription: any;

    const isAvailable = await Accelerometer.isAvailableAsync();
    console.log("🚀 ~ subscribeAccelerometer ~ isAvailableQQQ:", isAvailable);

    if (isAvailable) {
      return Accelerometer.addListener(async (accelerometerData) => {
        console.log(
          "🚀 ~ returnAccelerometer.addListener ~ accelerometerData:",
          accelerometerData
        );

        const { y } = accelerometerData;
        const threshold = 0.1;
        const timeStamp = new Date().getTime();
        if (
          Math.abs(y - lastY) > threshold &&
          !isCounting &&
          timeStamp - lastTimeStamp > 800
        ) {
          if (isStarted && !isPaused) {
            setIsCounting(true);
            setLastY(y);
            console.log(y, "no fear");
            setLastTimeStamp(lastTimeStamp);
            setSteps((prev) => prev + 1);
            if (isStarted && !isPaused) {
              setCurrentStepCount((prev) => prev + 1);
              await readHealthData(currentStepCount);
            }
            setTimeout(() => {
              setIsCounting(false);
            }, 1200);
          }
        }
      });
    } else
      show({
        message: "Accelerometer is not available in this device.",
        type: "info",
      });
  };

  useEffect(() => {
    /**
     * Sets up a subscription to the pendometer.
     * @returns A function that removes the subscription when called.
     */
    if (isIos) {
      const setupSubscription = async () => {
        const subscription = await subscribePendometer();
        return () => subscription && subscription.remove();
      };
      setupSubscription();
    }
    // else {
    //   const setupSubscription = async () => {
    //     const subscription = await subscribeAccelerometer();
    //     return () => subscription && subscription.remove();
    //   };
    //   setupSubscription();
    // }
  }, [isStarted, isPaused]);

  // useEffect(() => {
  //   if (isAndroid) {
  //     let subscription: any;

  //     Accelerometer.isAvailableAsync().then((result) => {
  //       if (result) {
  //         subscription = Accelerometer.addListener(
  //           async (accelerometerData) => {
  //             const { y } = accelerometerData;
  //             const threshold = 0.1;
  //             const timeStamp = new Date().getTime();
  //             if (
  //               Math.abs(y - lastY) > threshold &&
  //               !isCounting &&
  //               timeStamp - lastTimeStamp > 800
  //             ) {
  //               setIsCounting(true);
  //               setLastY(y);
  //               console.log(y, "no fear");
  //               setLastTimeStamp(lastTimeStamp);
  //               setCurrentStepCount((prev) => prev + 1);
  //               await readHealthData(currentStepCount);
  //               setSteps((prev) => prev + 1);
  //               setTimeout(() => {
  //                 setIsCounting(false);
  //               }, 1200);
  //             }
  //           }
  //         );
  //       } else
  //         show({
  //           message: "Accelerometer is not available in this device.",
  //           type: "info",
  //         });
  //     });

  //     return () => {
  //       if (subscription) {
  //         subscription.remove();
  //       }
  //     };
  //   }
  // }, [isCounting, lastY, lastTimeStamp]);

  /**
   * Reads health data and updates the workout store with the calculated values.
   * @param stepCount - The number of steps taken.
   */
  const readHealthData = async (stepCount: number) => {
    try {
      // const [stepCount, calories, heartRate, distance, pace] =
      //   await Promise.all([
      //     await healthKitService
      //       .getActiveSteps(new Date(startDate!))
      //       .then((res) => res.reduce((a, b) => a + b, 0)),
      //     await healthKitService
      //       .getActiveCalories(new Date(startDate!))
      //       .then((res) => res.reduce((a, b) => a + b, 0)),
      //     await healthKitService.getActiveHeartRate(new Date(startDate!)),
      //     await healthKitService.getActiveDistance(new Date(startDate!)),
      //     await healthKitService.getActivePace(new Date(startDate!)),
      //   ]);

      // setCurrentStepCount(stepCount);
      // //

      const distance = stepsToKilometers(stepCount, user?.height! ?? 170);
      const pace = calculatePace(workout.time, workout.distance, distance);

      const calories = calculateCaloriesBurnedByStepcount(
        user?.weight! ?? 70,
        pace,
        workout.steps,
        stepCount,
        parseFloat(calorieRate)
      );

      // const earning = calculateReward({
      //   calories_burned: calories,
      //   workout_type: workout.type as any,
      //   last_reward_amount: Number(user?.wallet?.current_earn_streak),
      // });

      WorkoutStore.update((s) => {
        s.steps = stepCount;
        s.distance = distance;
        s.calories = calories;
        // s.earning = +earning.toFixed(2);
        s.earning = 0;
        s.pace = pace;
        s.updatedDate = new Date();
      });
    } catch (e) {
      log("readHealthData error", e);
    }
  };

  // useEffect(() => {
  //   const fetchDataInterval = setInterval(async () => {
  //     await readHealthData();
  //   }, 5000); // Fetch data every 5 seconds

  //   // Cleanup the interval to avoid memory leaks
  //   return () => clearInterval(fetchDataInterval);
  // }, []);

  // useEffect(() => {
  //   const handleAppStateChange = async (nextAppState: string) => {
  //     if (nextAppState === "active") {
  //       setTimeout(async () => {
  //         console.log("Fetch data");
  //         await readHealthData();
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

  const startWorkout = async () => {
    setLoading(true);
    // await initializeHealthKit();
    WorkoutStore.update((s) => {
      s.isStarted = true;
      s.startDate = new Date();
      s.updatedDate = new Date();
      s.latitude = location?.latitude!;
      s.longitude = location?.longitude!;
      s.isPaused = false;
    });

    // setStartDate(new Date());

    setLoading(false);

    startLocation();

    speak("Workout started");
  };

  const pauseWorkout = async () => {
    WorkoutStore.update((s) => {
      s.isPaused = true;
      s.updatedDate = new Date();
      s.paused_intervals = [
        ...paused_intervals,
        {
          start:
            s.paused_intervals.length > 0
              ? s.paused_intervals[s.paused_intervals.length - 1].end
              : s.startDate!,
          end: new Date(),
        },
      ];
    });

    speak("Workout paused");
    stopLocation();
    await readHealthData(currentStepCount);
  };

  const resumeWorkout = async () => {
    setLoading(true);
    WorkoutStore.update((s) => {
      s.isPaused = false;
      s.updatedDate = new Date();
    });

    speak("Resumed workout");

    startLocation();
    await readHealthData(currentStepCount);
    setLoading(false);
  };

  const stopWorkout = async () => {
    const pace = calculatePace(time, workout.distance, workout.distance);
    setLoading(true);

    // Stop location
    stopLocation();
    WorkoutStore.update((s) => {
      s.isPaused = true;
      s.isStarted = false;
      s.stoppedAt = new Date(); // set default value of new Date() if stoppedAt is null
      s.updatedDate = new Date();
      s.steps = currentStepCount;
      s.pace = pace;
    });

    if (currentStepCount > 0) {
      await readHealthData(currentStepCount);

      // Save workout to healthkit
      healthKitService
        .saveWorkout({
          ...workout,
          startDate: workout.startDate!,
          calories: Number(workout?.calories) * 1000,
          distance: Number(workout?.distance) * 1000,
          stoppedAt: new Date(),
        })
        .then(async (results: any) => {
          if (results) {
            const body = {
              source: "apple",
              type: workout.type,
              start_date: new Date(workout.startDate!),
              end_date: new Date(),
              updated_date: workout.updatedDate,
              stopped_at: new Date(),
              calories: workout.calories?.toString(),
              energy_burned_unit: "calorie",
              steps: workout.steps.toString(),
              heart_rate: workout.heartRate.toString(),
              pace: workout.pace.toString(),
              average_pace: workout.pace.toString(),
              elevation: workout.elevation.toString(),
              distance_unit: "km",
              coordinates: workout.coordinates,
              distance: workout.distance.toString(),
              latitude: workout.latitude.toString(),
              longitude: workout.longitude.toString(),
              goal: workout.goal.toString(),
              mode: "daily",
              activity_id: results,
            };

            console.log(body, "Workout body");

            await mutateAsync(body, {
              onSuccess: () => {
                refreshTimelyStep();
              },
              onError: (error) => {
                console.log(error);
                // show({
                //   message: "Error saving workout",
                //   type: "error",
                // });
              },
            });
          }
        })
        .catch((error) => {
          console.log(error);
          show({
            message: "Error saving workout",
            type: "error",
          });
        });
    }

    if (onDone) {
      onDone();
    }

    setLoading(false);
    speak("Stopped workout");
  };

  const resetWorkout = async () => {
    stopLocation();
    WorkoutStore.update((s) => ({
      ...s,
      isPaused: true,
      isStarted: false,
      stoppedAt: new Date(),
      updatedDate: new Date(),
      steps: 0,
      distance: 0,
      calories: 0,
      heartRate: 0,
      coordinates: [{ latitude: 0, longitude: 0 }],
      earning: 0,
      pace: 0,
    }));
  };

  return {
    startWorkout,
    pauseWorkout,
    resumeWorkout,
    stopWorkout,
    resetWorkout,
    workout,
    loading: loading,
    currentStepCount,
    time,
  };
}

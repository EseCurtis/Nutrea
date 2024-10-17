import { useState, useEffect } from "react";
import { Accelerometer, Pedometer } from "expo-sensors";
import { AuthStore } from "../store/AuthStore";
import HealthKit from "../services/HealthKit";
import { useSpeech } from "./useSpeech";
import { WorkoutStore } from "../store/WorkoutStore";
import { useLocation } from "./useLocation";
import { useSaveWorkout } from "./api/run/useSaveWorkout";
import { useToast } from "../contexts/ToastProvider";
import * as Location from "expo-location";
import { LocationStore } from "../store/LocationStore";
import { isAndroid } from "../utils";
import { isIOS } from "../utils/deviceInfo";
import { haversineDistance } from "./useTotalDistance";
import { useWorkoutContext } from "../contexts/WorkoutContext";
// import * as AthlerseWearable from "athlerse-wearable";
// import { WatchErrorReason } from "athlerse-wearable/build/AthlerseWearable.enums";

const healthKitService = new HealthKit();

export const usePedometer = () => {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [pedometerStartTime, setPedometerStartTime] = useState<Date | null>(null);
  const [stopTime, setStopTime] = useState<Date | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState("00:00:00");
  const [isLoading, setIsLoading] = useState(false);
  const [steps, setSteps] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [lastTimeStamp, setLastTimeStamp] = useState(0);
  const [calculatedValues, setCalculatedValues] = useState<{
    caloriesBurned: string;
    distance: string;
    pace: string;
  }>({
    caloriesBurned: "0.00",
    distance: "0.00",
    pace: "0.00",
  });
  const [coordinates, setCoordinates] = useState<
    {
      latitude: number;
      longitude: number;
    }[]
  >([]);
  const [hasAppleWatch, setHasAppleWatch] = useState(true);

  let subscription: any;

  const { user } = AuthStore.useState((s) => s);
  const workout = WorkoutStore.useState((s) => s);
  const { workoutSettings } = useWorkoutContext();

  const { speak } = useSpeech();
  const { startLocation, stopLocation, location } = useLocation();
  const { mutateAsync } = useSaveWorkout();
  const { show } = useToast();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (startTime && isStarted && !isPaused) {
        refreshTimelyStep();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startTime, isStarted, isPaused, coordinates]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (startTime && isStarted && !isPaused) {
        const newDuration = formatDuration(startTime, new Date());
        setDuration(newDuration);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startTime, isStarted, isPaused]);

  const refreshTimelyStep = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      Pedometer.getStepCountAsync(pedometerStartTime!, new Date()).then((result) => {
        setCurrentStepCount((prev) => {
          if (result.steps > prev) {
            updateCalculations(result.steps, workout.type as any);
          }
          return result.steps ?? prev;
        });
      });
    } else {
      updateCalculations(0, workout.type as any);
    }
  };

  // ===========================================================FOR ANDROID======
  useEffect(() => {
    if (isAndroid) {
      if (startTime && isStarted && !isPaused) {
        Accelerometer.isAvailableAsync().then((result) => {
          if (result) {
            subscription = Accelerometer.addListener(async (accelerometerData) => {
              const { y } = accelerometerData;
              const threshold = 0.1;
              const timeStamp = new Date().getTime();
              if (Math.abs(y - lastY) > threshold && !isCounting && timeStamp - lastTimeStamp > 800) {
                setIsCounting(true);
                setLastY(y);
                // console.log(y, "no fearS");
                setLastTimeStamp(lastTimeStamp);
                setCurrentStepCount((prev) => prev + 1);
                // await readHealthData(currentStepCount);
                // console.log(currentStepCount, "CURES");
                setCurrentStepCount((prev) => {
                  if (currentStepCount > prev) {
                    updateCalculations(currentStepCount, workout.type as any);
                  }
                  return currentStepCount ?? prev;
                });
                setSteps((prev) => prev + 1);
                setTimeout(() => {
                  setIsCounting(false);
                }, 1200);
              }
            });
          }
        });

        return () => {
          if (subscription) {
            subscription.remove();
          }
        };
      }
    }
  }, [isCounting, lastY, lastTimeStamp, isPaused, isStarted]);

  useEffect(() => {
    // console.log(steps, "OPles");
    if (isAndroid) {
      if (isStarted && !isPaused) {
        setCurrentStepCount((prev) => {
          if (steps > prev) {
            updateCalculations(steps, workout.type as any);
          }
          return steps ?? prev;
        });
      }
    }
  }, [steps, isPaused, isStarted]);

  const startWorkout = async () => {
    // setIsLoading(true);
    setIsStarted(true);
    setStartTime(new Date());
    setPedometerStartTime(new Date());

    const location = await startLocation();
    console.log(location, "LOCATION");

    // setIsLoading(false);
    speak("Workout started");
  };

  const pauseWorkout = async () => {
    setIsPaused(true);
    setStopTime(new Date());
    speak("Workout paused");
    // await stopLocation();

    WorkoutStore.update((s) => {
      s.updatedDate = new Date();
      s.paused_intervals = [
        ...s.paused_intervals,
        {
          start: s.paused_intervals.length > 0 ? s.paused_intervals[s.paused_intervals.length - 1].end : s.startDate!,
          end: new Date(),
        },
      ];
    });
  };

  const resumeWorkout = async () => {
    // setIsLoading(true);
    setIsPaused(false);
    setStartTime(new Date(new Date(startTime!).getTime() + (new Date().getTime() - new Date(stopTime!).getTime())));
    setStopTime(null);
    speak("Resumed workout");
    // await startLocation();
    // setIsLoading(false);

    WorkoutStore.update((s) => {
      s.updatedDate = new Date();
    });
  };

  const stopWorkout = async () => {
    stopLocation();
    setIsLoading(true);
    setIsStarted(false);
    setIsPaused(false);
    setStopTime(new Date());

    WorkoutStore.update((s) => {
      s.steps = currentStepCount;
      s.distance = Number(calculatedValues.distance);
      s.calories = Number(calculatedValues.caloriesBurned);
      s.earning = 0;
      s.pace = Number(calculatedValues.pace);
      s.updatedDate = new Date();
      s.startDate = startTime;
      s.stoppedAt = stopTime;
      s.latitude = location?.latitude!;
      s.longitude = location?.longitude!;
      s.time = duration;
      s.coordinates = coordinates;
    });

    if (currentStepCount > 0 || +calculatedValues.distance > 0) {
      // Save workout to healthkit

      const body = {
        source: "apple",
        type: workout.type,
        start_date: startTime,
        end_date: new Date(),
        updated_date: workout.updatedDate,
        stopped_at: new Date(),
        calories: calculatedValues.caloriesBurned,
        energy_burned_unit: "calorie",
        steps: currentStepCount.toString(),
        heart_rate: workout.heartRate.toString(),
        pace: calculatedValues.pace,
        average_pace: calculatedValues.pace,
        elevation: workout.elevation.toString(),
        distance_unit: "km",
        coordinates: coordinates,
        distance: calculatedValues.distance,
        latitude: location?.latitude?.toString(),
        longitude: location.longitude?.toString(),
        goal: workout.goal.toString(),
        mode: "daily",
        recordSource: "Athlerse",
      };

      const isEnabled = await healthKitService.isEnabled();

      if (isEnabled && workoutSettings.connectedDevice == "phone") {
        healthKitService
          .saveWorkout({
            ...workout,
            startDate: startTime!,
            steps: currentStepCount,
            calories: Number(calculatedValues.caloriesBurned) * 1000,
            distance: Number(calculatedValues.distance) * 1000,
            stoppedAt: new Date(),
          })
          .then(async (results: any) => {
            console.log(results, "HEALTHKIT");
            if (results) {
              console.log("SAVED TO HEALTHKIT");
              await mutateAsync(
                { ...body, activity_id: results[0] ?? results },
                {
                  onSuccess: () => {
                    if (isIOS) {
                      refreshTimelyStep();
                    }
                    console.log("SAVED TO SERVER");
                  },
                  onError: (error) => {
                    console.log(error);
                  },
                }
              );
              // if (subscription) {
              // subscription.remove();
              Accelerometer.removeAllListeners();
              // }
            }
          })
          .catch((error) => {
            console.log(error);
            show({
              message: "Error saving workout",
              type: "error",
            });
          });
      } else {
        await mutateAsync(body, {
          onSuccess: () => {
            if (isIOS) {
              refreshTimelyStep();
              console.log("SAVED TO SERVER");
            }
          },
          onError: (error) => {
            console.log(error);
          },
        });
        // if (subscription) {
        // subscription.remove();
        Accelerometer.removeAllListeners();
      }
    }

    setIsLoading(false);
    speak("Stopped workout");
  };

  const formatDuration = (start: Date, stop: Date) => {
    if (!start || !stop) return "00:00:00";

    const durationInSeconds = Math.floor((stop.getTime() - start.getTime()) / 1000);
    const hours = String(Math.floor(durationInSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((durationInSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(durationInSeconds % 60).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  };
  // console.log(Math.sqrt(1.089));

  /**
   * Updates the calculations based on the step count and workout type.
   * @param stepCount - The number of steps taken.
   * @param workoutType - The type of workout ("running" or "walking").
   */
  const updateCalculations = (stepCount: number, workoutType: "Running" | "Walking" | "Cycling") => {
    const userGender = user?.gender || "male";
    let stepsPerKm = userGender === "male" ? 1316 : 1493;
    if (workoutType === "Running") {
      stepsPerKm = 950; // Adjust this value based on the typical steps per kilometer for running
    } else if (workoutType === "Walking") {
      stepsPerKm = userGender === "male" ? 1316 : 1493; // Use the original value for walking
    } else if (workoutType === "Cycling") {
      stepsPerKm = 0; // No steps are taken while cycling
    }

    // const strideLength = 100000 / stepsPerKm; // 100,000 cm in a kilometer
    // const strideLengthMeters = strideLength / 100;
    // const heightMeters = (user?.height! ?? 159) / 100; // Convert height from cm to meters
    // const verticalDistance = heightMeters;

    // const horizontalDistance = Math.sqrt(
    //   Math.pow(strideLengthMeters * stepCount, 2) -
    //     Math.pow(verticalDistance, 2)
    // );
    // const distance = ((horizontalDistance || 0) / 1000).toFixed(2); // Convert to kilometers

    let metValue = 0;
    if (workoutType === "Running") {
      metValue = 8.0; // MET value for running
    } else if (workoutType === "Walking") {
      metValue = 3.5; // MET value for walking
    } else if (workoutType === "Cycling") {
      metValue = 7.0; // MET value for cycling
    }

    const timeInSeconds = (stopTime || new Date()).getTime() - startTime!.getTime();
    const timeInHours = timeInSeconds / (60 * 60 * 1000);
    const weightInKg = user?.weight! ?? 70;
    const caloriesBurned = (metValue * weightInKg * timeInHours).toFixed(2);

    // const prevDistance = Number(calculatedValues.distance) || 0;
    // const time = (stopTime || new Date()).getTime() - startTime!.getTime();
    // const duration = time / 60000; // Convert to minutes
    // const currentDistance = Number(distance);

    // const pace =
    //   duration < 1 || prevDistance >= currentDistance
    //     ? currentDistance > 0
    //       ? Math.abs(duration / currentDistance)
    //       : 0
    //     : duration / Math.abs(currentDistance - prevDistance);

    let distance = 0;
    for (let i = 0; i < coordinates.length - 1; i++) {
      distance += haversineDistance(coordinates[i], coordinates[i + 1]);
    }

    // const durationInMinutes =
    //   (new Date().getTime() - startTime!?.getTime()) / 1000 / 60;
    // const calculatedPace = durationInMinutes / distance;

    const durationInHours = (new Date().getTime() - startTime!?.getTime()) / 1000 / 3600;
    const calculatedSpeed = distance / durationInHours;

    setCalculatedValues({
      ...calculatedValues,
      caloriesBurned,
      distance: distance.toFixed(2),
      pace: distance > 0 ? calculatedSpeed.toFixed(1) : "0.00",
    });
  };

  const locationSubcription = async () => {
    const foregroundPermission = await Location.requestForegroundPermissionsAsync();
    // const backgroundPermission =
    //   await Location.requestBackgroundPermissionsAsync();
    if (
      foregroundPermission.status !== "granted"
      // &&  backgroundPermission.status !== "granted"
    ) {
      show({
        type: "error",
        message: "Permission to access location was denied",
      });

      return null;
    }

    const locationSubscriber = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 10,
      },
      (newLocation) => {
        if (!isPaused) {
          LocationStore.update((s) => {
            s.latitude = newLocation.coords.latitude;
            s.longitude = newLocation.coords.longitude;
          });

          // check if new location is already in the array
          const isAlreadyInArray = coordinates.some(
            (coord) => coord.latitude === newLocation.coords.latitude && coord.longitude === newLocation.coords.longitude
          );

          if (!isAlreadyInArray) {
            setCoordinates((prev) => [
              ...prev,
              {
                latitude: newLocation.coords.latitude,
                longitude: newLocation.coords.longitude,
              },
            ]);
          }
        }
      }
    );

    return () => {
      if (locationSubscriber) {
        locationSubscriber.remove();
      }
    };
  };

  useEffect(() => {
    if (isStarted && !isPaused) {
      locationSubcription();
    }
  }, [isPaused, isStarted]);

  console.log("Watch connected", hasAppleWatch);

  // useEffect(() => {
  //   AthlerseWearable.initialise();
  //   AthlerseWearable.addWatchErrorListener((error) => {
  //     if (error.error === WatchErrorReason.NotInstalled) {
  //       setHasAppleWatch(false);
  //     }

  //     if (error.error === WatchErrorReason.NotReachable) {
  //       setHasAppleWatch(false);
  //     }

  //     if (error.error === WatchErrorReason.HealthDataUnavailable) {
  //       setHasAppleWatch(false);
  //     }

  //     if (error.error === WatchErrorReason.AuthorizationFailed) {
  //       setHasAppleWatch(false);
  //     }

  //     if (error.error === WatchErrorReason.UnknownError) {
  //       setHasAppleWatch(false);
  //     }
  //   });

  //   AthlerseWearable.addWatchUserInfoListener((message) => {
  //     console.log("Received onWatchMessage event:", message);
  //     // setData(JSON.stringify(message));
  //   });
  //   return () => {};
  // }, []);

  return {
    isPedometerAvailable,
    currentStepCount,
    startTime,
    stopTime,
    duration,
    isStarted,
    isPaused,
    startWorkout,
    pauseWorkout,
    resumeWorkout,
    stopWorkout,
    isLoading,
    coordinates,
    ...calculatedValues,
  };
};

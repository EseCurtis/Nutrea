import { Store } from "pullstate";
import AppleHealthKit, {
  HealthActivity,
  HealthUnit,
} from "react-native-health";

const DISTANCE_UNIT = AppleHealthKit.Constants.Units.mile;
const ENERGY_BURN_UNIT = AppleHealthKit.Constants.Units.calorie;
const WORKOUT_TYPE = AppleHealthKit.Constants.Activities.Running;

export interface Workout {
  type: HealthActivity;
  startDate: Date | null;
  updatedDate: Date | null;
  calories: number;
  energyBurnedUnit: HealthUnit;
  steps: number;
  heartRate: number;
  pace: number;
  averagePace: any[];
  elevation: number;
  distanceUnit: HealthUnit;
  coordinates: {
    latitude: number;
    longitude: number;
  }[];
  distance: number;
  isStarted: boolean;
  isPaused: boolean;
  isCompleted: boolean;
  latitude: number;
  longitude: number;
  stoppedAt: Date | null;
  goal: number;
  earning: number;
  workoutSource: "apple" | "google";
  mode: "daily" | "classic";
  time: string;
  mapType?: "standard" | "hybrid" | "satellite" | "terrain" | undefined;
  paused_intervals: {
    start: Date;
    end: Date;
  }[];
  targetMetric: "distance" | "time" | "free";
  audioFeedbackVoice: "male" | "female";
  audioFeedback: boolean;
  workoutSettings: WorkoutSettings;
}

export interface WorkoutSettings {
  goal: string;
  targetMetric: "distance" | "time" | "free";
  countDown: boolean;
  countDownNumber: number;
  audioFeedback: boolean;
  audioFeedbackInterval: number;
  audioFeedbackType: "distance" | "time";
  audioFeedbackVoice: "male" | "female";
  stepGoal: number;
  calorieGoal: number;
  connectedDevice?: string;
}

export const WorkoutStore = new Store<Workout>({
  type: "Walking" as any,
  startDate: null,
  updatedDate: null,
  calories: 0,
  energyBurnedUnit: ENERGY_BURN_UNIT,
  steps: 0,
  heartRate: 0,
  pace: 0,
  averagePace: [],
  elevation: 0,
  distanceUnit: DISTANCE_UNIT,
  coordinates: [{ latitude: 0, longitude: 0 }],
  distance: 0.0,
  isStarted: false,
  isPaused: true,
  isCompleted: false,
  latitude: 0,
  longitude: 0,
  stoppedAt: null,
  goal: 0,
  earning: 0,
  workoutSource: "apple",
  mode: "daily",
  time: "",
  mapType: "standard",
  paused_intervals: [],
  targetMetric: "distance",
  audioFeedbackVoice: "male",
  audioFeedback: true,
  workoutSettings: {
    goal: "12",
    targetMetric: "distance",
    countDown: true,
    countDownNumber: 3,
    audioFeedback: true,
    audioFeedbackInterval: 5,
    audioFeedbackType: "distance",
    audioFeedbackVoice: "male",
    stepGoal: 10000,
    calorieGoal: 500,
    connectedDevice: "",
  },
});

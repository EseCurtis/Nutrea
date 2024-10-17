import { Store } from "pullstate";
import { fillArray } from "../utils/fillArray";

export const HealthDataStore = new Store<{
  calories: number[];
  totalCalories: number;
  steps: number[];
  stepCount: number;
  allSteps: number;
  allCalories: number;
}>({
  calories: fillArray([], 12, 15),
  totalCalories: 0,
  steps: fillArray([], 12, 15),
  stepCount: 0,
  allCalories: 0,
  allSteps: 0,
});

import { HealthActivity } from "react-native-health";
import {
  CoreTraining,
  Cycling,
  CyclingDark,
  Mind,
  Running,
  RunningDark,
  Strength,
  Swimming,
  SwimmingDark,
  Walking,
  WalkingDark,
  Yoga,
  YogaDark,
} from "../components/icons/WorkoutIcons";
import { useColorScheme } from "@/src/hooks/useAppColorScheme";

export function useWorkouts() {
  const colorScheme = useColorScheme();
  const isLight = colorScheme === "light";

  const workouts = [
    {
      label: "Running",
      icon: isLight ? <Running /> : <RunningDark />,
      show: true,
      list: true,
      type: "Running",
      image: require("../assets/images/icons/running.png"),
    },
    {
      label: "Walking",
      icon: isLight ? <Walking /> : <WalkingDark />,
      show: true,
      list: true,
      type: "Walking",
      image: require("../assets/images/icons/walking.png"),
    },
    {
      label: "Cycling",
      icon: isLight ? <Cycling /> : <CyclingDark />,
      show: true,
      list: true,
      type: "Cycling",
      image: require("../assets/images/icons/cycling.png"),
    },
    {
      label: "Yoga",
      icon: isLight ? <Yoga /> : <YogaDark />,
      show: false,
      list: true,
      type: "Yoga",
      image: require("../assets/images/icons/yoga.png"),
    },
    {
      label: "Swimming",
      icon: isLight ? <Swimming /> : <SwimmingDark />,
      show: false,
      list: true,
      type: "Swimming",
      image: require("../assets/images/icons/swimming.png"),
    },
    {
      label: "Strength training",
      icon: <Strength />,
      show: false,
      list: false,
      type: "TraditionalStrengthTraining",
      image: require("../assets/images/others/workout4.png"),
    },
    {
      label: "Mind and body",
      icon: <Mind />,
      show: false,
      list: false,
      type: "MindAndBody",
      image: require("../assets/images/others/workout4.png"),
    },
    {
      label: "Core training",
      icon: <CoreTraining />,
      show: false,
      list: false,
      type: "CoreTraining",
      image: require("../assets/images/others/workout4.png"),
    },
  ];

  return {
    workouts,
  };
}

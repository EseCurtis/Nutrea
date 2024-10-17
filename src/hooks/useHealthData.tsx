import { useCallback, useEffect, useState } from "react";
import HealthKit from "../services/HealthKit";
import moment from "moment";
import { HealthDataStore } from "../store/HealthDataStore";
import { AuthStore } from "../store/AuthStore";
import { AppState, Linking } from "react-native";
import { isIos } from "../utils";
import { useFocusEffect } from "@react-navigation/native";
import {
  initialize,
  getSdkStatus,
  SdkAvailabilityStatus,
  getGrantedPermissions,
} from "react-native-health-connect";
import { useToast } from "../contexts/ToastProvider";
import { useHealthKit } from "../contexts/HealthKitContext";

export function useHealthData(startDate?: Date) {
  const healthKit = new HealthKit();
  const data = HealthDataStore.useState((s) => s);
  const { user } = AuthStore.useState((s) => s);
  const [isHealthKitPermitted, setIsHealthKitPermitted] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);
  const { show } = useToast();

  const openHealthConnectInPlayStore = () => {
    Linking.openURL("market://details?id=com.google.android.apps.healthdata");
  };

  const getSteps = async () => {
    if (isIos) {
      const status = await healthKit.getAuthStatus();

      if (!status) {
        return;
      }

      const startOfDay = moment
        .utc(startDate ?? new Date())
        .startOf("day")
        .toDate();
      const endOfStartOfDay = moment
        .utc(startDate ?? new Date())
        .endOf("day")
        .toDate();

      const healthData = await healthKit.getHealthData(
        startOfDay,
        endOfStartOfDay
      );

      const userJoinDate = new Date(user?.created_at!);

      const allTimeSteps = await healthKit.getActiveSteps(userJoinDate);
      const allTimeCalories = await healthKit.getActiveCalories(userJoinDate);

      const totalAllTimeSteps = allTimeSteps.reduce(
        (currentSteps, prevSteps) => currentSteps + prevSteps,
        0
      );

      const totalAllTimeCalories = allTimeCalories.reduce(
        (currentCalories, prevCalories) => currentCalories + prevCalories,
        0
      );

      HealthDataStore.update((s) => {
        s.calories = healthData?.calories!;
        s.totalCalories = healthData?.totalCalories!;
        s.stepCount = healthData?.totalSteps!;
        s.steps = healthData?.steps!;
        s.allCalories = totalAllTimeCalories;
        s.allSteps = totalAllTimeSteps;
      });

      return {
        calories: healthData?.calories,
        totalCalories: healthData?.totalCalories,
        stepCount: healthData?.totalSteps,
        steps: healthData?.steps,
        allCalories: totalAllTimeCalories,
        allSteps: totalAllTimeSteps,
      };
    } else {
      const status = await getSdkStatus();
      if (
        status ===
        SdkAvailabilityStatus.SDK_UNAVAILABLE_PROVIDER_UPDATE_REQUIRED
      ) {
        return;
      }

      const isInitialized = await initialize();
      if (!isInitialized) {
        return;
      }

      const permissions = await getGrantedPermissions();
      const permArray = permissions.map((perm) => perm.recordType);
      const notPermitted = ["Steps", "Distance", "ActiveCaloriesBurned"].filter(
        (x: any) => !permArray.includes(x)
      );
      if (Boolean(notPermitted.length)) return;

      // await new Promise((resolve) => setTimeout(resolve, 500));

      const startOfDay = moment
        .utc(startDate ?? new Date())
        .startOf("day")
        .toDate();
      const endOfStartOfDay = moment
        .utc(startDate ?? new Date())
        .endOf("day")
        .toDate();

      const healthData = await healthKit.getHealthData(
        startOfDay,
        endOfStartOfDay
      );

      const userJoinDate = new Date(user?.created_at!);

      const allTimeSteps = await healthKit.getActiveSteps(userJoinDate);
      const allTimeCalories = await healthKit.getActiveCalories(userJoinDate);

      const totalAllTimeSteps = allTimeSteps.reduce(
        (currentSteps, prevSteps) => currentSteps + prevSteps,
        0
      );

      const totalAllTimeCalories = allTimeCalories.reduce(
        (currentCalories, prevCalories) => currentCalories + prevCalories,
        0
      );

      HealthDataStore.update((s) => {
        s.calories = healthData?.calories!;
        s.totalCalories = healthData?.totalCalories!;
        s.stepCount = healthData?.totalSteps!;
        s.steps = healthData?.steps!;
        s.allCalories = totalAllTimeCalories;
        s.allSteps = totalAllTimeSteps;
      });

      return {
        calories: healthData?.calories,
        totalCalories: healthData?.totalCalories,
        stepCount: healthData?.totalSteps,
        steps: healthData?.steps,
        allCalories: totalAllTimeCalories,
        allSteps: totalAllTimeSteps,
      };
    }
  };

  const checkHealthKitStatus = async () => {
    if (isIos) {
      const health = new HealthKit();
      const status = await health.getAuthStatus();
      const isEnabled = await health.isEnabled();
      setIsHealthKitPermitted(status);
      setIsEnabled(isEnabled);
    } else {
      setIsHealthKitPermitted(true);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (isHealthKitPermitted && isIos) {
        getSteps();
      }
      checkHealthKitStatus();
    }, [startDate, isHealthKitPermitted])
  );

  useEffect(() => {
    checkHealthKitStatus();
  }, []);

  useEffect(() => {
    if (isIos) {
      const handleAppStateChange = async (nextAppState: string) => {
        if (nextAppState === "active") {
          checkHealthKitStatus();
          const status = await healthKit.getAuthStatus();
          if (status) {
            getSteps();
          }
        }
      };
      const appStateSubscription = AppState.addEventListener(
        "change",
        handleAppStateChange
      );

      return () => {
        appStateSubscription.remove();
      };
    }
  }, []);

  return {
    getSteps,
    isHealthKitPermitted,
    isEnabled,
    checkHealthKitStatus,
    ...data,
  };
}

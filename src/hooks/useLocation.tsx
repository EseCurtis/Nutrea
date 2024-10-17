import { useState } from "react";
import { LocationStore } from "../store/LocationStore";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { LOCATION_TRACKING } from "../constant";
import { WorkoutStore } from "../store/WorkoutStore";
import { useToast } from "../contexts/ToastProvider";

export function useLocation() {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const location = LocationStore.useState((s) => s);
  const [isStarted, setIsStarted] = useState(false);
  const [isGranted, setIsGranted] = useState(false);

  const startLocationTracking = async () => {
    try {
      setLoading(true);

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        toast.show({
          message: "Permission to access location was denied",
          type: "error",
        });
        setLoading(false);
        return null;
      }
      await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 5000,
        distanceInterval: 0,
      });

      await Location.hasStartedLocationUpdatesAsync(LOCATION_TRACKING);

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      LocationStore.update((s) => {
        s.latitude = currentLocation.coords.latitude;
        s.longitude = currentLocation.coords.longitude;
      });

      setIsStarted(true);
      setLoading(false);

      return currentLocation;
    } catch (e: any) {
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      LocationStore.update((s) => {
        s.latitude = currentLocation.coords.latitude;
        s.longitude = currentLocation.coords.longitude;
      });

      setIsStarted(true);
      setLoading(false);
      return currentLocation;
    }
  };

  const getLocation = async () => {
    setLoading(true);
    console.log("Checkign");

    if (location.latitude && location.longitude) {
      setLoading(false);
      return location;
    }

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      toast.show({
        message: "Permission to access location was denied",
        type: "error",
      });
      setLoading(false);
      return null;
    }

    const currentLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });

    LocationStore.update((s) => {
      s.latitude = currentLocation.coords.latitude;
      s.longitude = currentLocation.coords.longitude;
    });
    setLoading(false);

    return {
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    };
  };

  const checkLocationPermisson = async () => {
    const status = Location.getBackgroundPermissionsAsync();
    return status;
  };

  // useEffect(() => {
  //   const configurePermissions = async () => {
  //     const foregroundPermission =
  //       await Location.requestForegroundPermissionsAsync();
  //     // const backgroundPermission =
  //     //   await Location.requestBackgroundPermissionsAsync();
  //     if (
  //       foregroundPermission.status !== "granted"
  //       // &&  backgroundPermission.status !== "granted"
  //     ) {
  //       console.log("Permission to access location was denied");
  //       toast.show("Permission to access location was denied", {
  //         type: "danger",
  //       });
  //     } else {
  //       console.log("Permission to access location granted");
  //     }
  //   };

  //   configurePermissions();
  // }, [toast]);

  const startLocation = () => {
    return startLocationTracking();
  };

  const stopLocation = () => {
    TaskManager.isTaskRegisteredAsync(LOCATION_TRACKING).then((tracking) => {
      if (tracking) {
        Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
      }
    });
    setIsStarted(false);
  };

  return {
    location,
    startLocation,
    stopLocation,
    loading,
    isStarted,
    getLocation,
    checkLocationPermisson,
  };
}

TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
  if (error) {
    return;
  }
  if (data) {
    // @ts-ignore
    const { locations } = data;
    let lat = locations[0].coords.latitude;
    let long = locations[0].coords.longitude;

    LocationStore.update((s) => {
      s.latitude = lat;
      s.longitude = long;
    });

    const workout = WorkoutStore.getRawState();

    if (workout.isStarted && !workout.isPaused) {
      const isAlreadyInArray = workout.coordinates.some(
        (coord) => coord.latitude === lat && coord.longitude === long
      );

      if (!isAlreadyInArray) {
        WorkoutStore.update((s) => {
          s.coordinates = [
            ...s.coordinates,
            {
              latitude: lat,
              longitude: long,
            },
          ];
          s.updatedDate = new Date();
        });
      }
    }
  }
});

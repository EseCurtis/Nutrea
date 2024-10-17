import { useState, useEffect } from "react";

interface Coordinate {
  latitude: number;
  longitude: number;
}

export const haversineDistance = (coord1: Coordinate, coord2: Coordinate) => {
  const toRad = (value: number) => (value * Math.PI) / 180;

  const lat1 = coord1.latitude;
  const lon1 = coord1.longitude;
  const lat2 = coord2.latitude;
  const lon2 = coord2.longitude;

  const R = 6371; // Earth's radius in kilometers

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in kilometers
  return distance;
};

export const useTotalDistance = (coordinates: Coordinate[]) => {
  const [totalDistance, setTotalDistance] = useState<number>(0);

  useEffect(() => {
    if (coordinates.length < 2) {
      setTotalDistance(0);
      return;
    }

    let distance = 0;
    for (let i = 0; i < coordinates.length - 1; i++) {
      distance += haversineDistance(coordinates[i], coordinates[i + 1]);
    }

    setTotalDistance(parseFloat(distance.toFixed(2)));
  }, [coordinates]);

  return totalDistance;
};

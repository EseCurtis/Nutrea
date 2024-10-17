import { useState, useEffect } from "react";
import axios from "axios";
import { googleMapApiKey } from "../utils";

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface DistanceData {
  distance: string;
  duration: string;
}

export const useDistanceMatrix = ({
  origin,
  destination,
}: {
  origin: Coordinate;
  destination: Coordinate;
}) => {
  const [distanceData, setDistanceData] = useState<DistanceData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const apiKey = googleMapApiKey;

  useEffect(() => {
    const fetchDistance = async () => {
      try {
        const originStr = `${origin.latitude},${origin.longitude}`;
        const destinationStr = `${destination.latitude},${destination.longitude}`;
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originStr}&destinations=${destinationStr}&key=${apiKey}`;

        const response = await axios.get(url);
        const data = response.data;

        if (data.rows[0].elements[0].status === "OK") {
          const distance = data.rows[0].elements[0].distance.text;
          const duration = data.rows[0].elements[0].duration.text;
          setDistanceData({
            distance: distance?.split(" ")[0],
            duration,
          });
        } else {
          setError("Error fetching distance matrix");
        }
      } catch (error) {
        setError("Error fetching distance matrix");
      }
    };

    fetchDistance();
  }, [origin, destination, apiKey]);

  return { distanceData, error };
};

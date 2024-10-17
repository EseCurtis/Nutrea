import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { formatTimeString } from "../../utils/formatTimeString";

interface StopWatchProps {
  start: boolean;
  reset: boolean;
  msecs: boolean;
  options: Record<string, any>;
  laps: boolean;
  getTime: (time: string) => void;
  startTime: number;
  getMsecs: (msecs: number) => void;
}

const StopWatch: React.FC<StopWatchProps> = (props) => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [stopTime, setStopTime] = useState<Date | null>(null);
  const [pausedTime, setPausedTime] = useState<number | null>(null);
  const [started, setStarted] = useState<boolean>(false);
  const [elapsed, setElapsed] = useState<number>(props.startTime || 0);

  const { msecs, options, laps, getTime, getMsecs } = props;

  let interval: any = null;

  const start = () => {
    if (laps && elapsed) {
      const lap = new Date().getTime() - (stopTime ? stopTime.getTime() : 0);
      setStopTime(null);
      setPausedTime((pausedTime ? pausedTime : 0) + lap);
    }

    setStartTime(
      elapsed ? new Date().getTime() - elapsed : new Date().getTime()
    );

    setStarted(true);

    if (!interval) {
      interval = setInterval(() => {
        setElapsed(new Date().getTime() - startTime!);
      }, 1);
    }
  };

  const stop = () => {
    if (interval) {
      if (laps) {
        setStopTime(new Date());
      }

      clearInterval(interval);
      interval = null;
    }

    setStarted(false);
  };

  const reset = () => {
    const { startTime } = props;
    setElapsed(startTime || 0);
    setStartTime(null);
    setStopTime(null);
    setPausedTime(null);
  };

  const formatTime = () => {
    const now = elapsed;
    const formatted = formatTimeString(now, msecs);
    if (typeof getTime === "function") {
      getTime(formatted);
    }
    if (typeof getMsecs === "function") {
      getMsecs(now);
    }
    return formatted;
  };

  useEffect(() => {
    if (props.start) {
      start();
    }
  }, []);

  useEffect(() => {
    if (props.start) {
      start();
    } else {
      stop();
    }
    if (props.reset) {
      reset();
    }
  }, [props.start, props.reset]);

  return (
    <View
      ref="stopwatch"
      style={options ? options.container : defaultStyles.container}
    >
      <Text style={options ? options.text : defaultStyles.text}>
        {formatTime()}
      </Text>
    </View>
  );
};

const defaultStyles = {
  container: {
    backgroundColor: "#000",
    padding: 5,
    borderRadius: 5,
    width: 150,
  },
  text: {
    fontSize: 30,
    color: "#FFF",
    marginLeft: 7,
  },
};

export default StopWatch;

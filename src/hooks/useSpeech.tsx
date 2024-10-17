import * as Speech from "expo-speech";
import { isDev } from "../utils";
import { useWorkoutContext } from "../contexts/WorkoutContext";

export function useSpeech() {
  const { workoutSettings } = useWorkoutContext();
  const voice =
    workoutSettings.audioFeedbackVoice === "female" ? "en-US" : "en-GB";

  const speak = (text: string) => {
    if (isDev) {
      console.log("Speak", text);
      return;
    }

    if (!workoutSettings.audioFeedback) {
      return;
    }

    Speech.isSpeakingAsync().then((isSpeaking) => {
      if (!isSpeaking) {
        Speech.speak(text, {
          language: voice,
          pitch: 1,
          rate: 1,
        });
      }
    });
  };

  return {
    speak,
  };
}

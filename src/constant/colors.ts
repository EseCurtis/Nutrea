/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// const tintColorLight = "#4A3AFF";
const tintColorLight = "#0D0D0D";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#1A202C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    card: "#F4F6F9",
    cardTint: "#E2E8F0",
    primary: "#6E50F0",
    secondary: "#1867FF",
  },
  dark: {
    text: "#fff",
    background: "#191A1C",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#A9AAB1",
    tabIconSelected: tintColorDark,
    card: "#24252A",
    cardTint: "rgba(255, 255, 255, 0.05)",
    primary: "#6E50F0",
    secondary: "#1867FF",
  },
};

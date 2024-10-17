import * as Haptics from 'expo-haptics';

export function useHapticFeedback() {
  const haptic = () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  const successHaptic = () =>
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  const errorHaptic = () =>
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

  return {
    haptic,
    successHaptic,
    errorHaptic,
  };
}

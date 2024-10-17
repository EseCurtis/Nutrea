import React from "react";
import { useToast } from "../../contexts/ToastProvider";
import { Toast } from "./Toast";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";

export function ToastsContainer() {
  const { toasts } = useToast();
  const { bottom } = useSafeAreaInsets();

  return (
    <View className="absolute left-0 w-full" style={{ bottom }}>
      {toasts.map((toast, index) => (
        <Toast
          key={index}
          message={toast.message}
          type={toast.type}
          index={index}
          id={toast.id}
        />
      ))}
    </View>
  );
}

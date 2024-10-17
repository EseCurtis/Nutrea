import { FC, PropsWithChildren, Ref, useCallback, useMemo } from "react";
import { Dimensions } from "react-native";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { isAndroid, windowHeight } from "@/src/utils";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CustomBottomSheetModalProps extends PropsWithChildren {
  modalRef?: Ref<BottomSheetModal>;
  height?: string;
  onDismiss?: () => void;
  closeOnTap?: () => void;
  isbottomSheet?: boolean;
  preventClose?: boolean;
}

const CustomBottomSheetModal: FC<CustomBottomSheetModalProps> = ({
  children,
  modalRef,
  height,
  onDismiss,
  closeOnTap,
  isbottomSheet,
  preventClose,
  ...props
}): JSX.Element => {
  const { height: h } = Dimensions.get("window");

  const hp = (h * Number((height || "70%").replace("%", ""))) / 100;

  const { top } = useSafeAreaInsets();

  const snapPoints = useMemo(
    () => [hp + (isAndroid ? 5 : 0), windowHeight - top],
    [],
  );
  const background = useThemeColor({}, "background");

  const renderBackdrop = useCallback(
    (prop: any) => (
      <BottomSheetBackdrop
        {...prop}
        opacity={0.7}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      >
        <BlurView
          intensity={90}
          style={{
            position: "absolute",
            backgroundColor: "rgba(75, 27, 169, 0.12)",
            width: "100%",
            height: "100%",
          }}
        ></BlurView>
      </BottomSheetBackdrop>
    ),
    [],
  );

  if (isbottomSheet) {
    return (
      <BottomSheet
        ref={modalRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{ display: "none" }}
        handleStyle={{ display: "none" }}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        onClose={onDismiss}
        backgroundStyle={[
          {
            borderTopRightRadius: 24,
            borderTopLeftRadius: 24,
            backgroundColor: background,
          },
        ]}
        {...props}
      >
        {children}
      </BottomSheet>
    );
  }

  return (
    <BottomSheetModal
      ref={modalRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      backgroundStyle={[
        {
          backgroundColor: background,
          borderTopRightRadius: 24,
          borderTopLeftRadius: 24,
          overflow: "hidden",
        },
      ]}
      android_keyboardInputMode="adjustResize"
      onDismiss={onDismiss}
      style={{ flex: 1 }}
      enableContentPanningGesture={!preventClose}
      enableHandlePanningGesture={!preventClose}
      stackBehavior="push"
      {...props}
    >
      {children}
    </BottomSheetModal>
  );
};

export default CustomBottomSheetModal;

import { Text } from "./Text";
import clsx from "clsx";
import { MutableRefObject, PropsWithChildren, memo } from "react";
import CustomBottomSheetModal from "./CustomBottomSheetModal";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { View } from "react-native";
import { useThemeColor } from "@/src/hooks/useThemeColor";

type Props = {
  title?: string;
  noWidth?: boolean;
  hideHeader?: boolean;
  noPadding?: boolean;
  isbottomSheet?: boolean;
  height?: string;
  modalRef: MutableRefObject<BottomSheetModal>;
  isScrollable?: boolean;
  onDismiss?: (() => void) | undefined;
  preventClose?: boolean;
};

function BottomModalComponent({
  title,
  children,
  noWidth,
  hideHeader,
  height,
  noPadding,
  isbottomSheet,
  modalRef,
  isScrollable,
  onDismiss,
  preventClose,
}: PropsWithChildren<Props>) {
  const background = useThemeColor({}, "background");

  return (
    <CustomBottomSheetModal
      modalRef={modalRef}
      height={height || "70%"}
      isbottomSheet={isbottomSheet}
      onDismiss={onDismiss}
      preventClose={preventClose}
    >
      <View
        className={clsx(
          "flex-1 flex-col items-center rounded-tr-3xl rounded-tl-3xl overflow-hidden relative",
          noWidth ? "" : "w-full",
        )}
        style={{ backgroundColor: background }}
      >
        <View
          className={clsx("flex-1 w-full", !noPadding ? "px-4" : "")}
          style={{ backgroundColor: background }}
        >
          {!hideHeader && (
            <View className="flex relative w-full items-center justify-center mb-6 py-2">
              <Text
                fontWeight="bold"
                className="text-center text-2xl leading-relaxed"
              >
                {title}
              </Text>
            </View>
          )}

          <View className="flex-1 w-full">
            {isScrollable ? (
              <BottomSheetScrollView>{children}</BottomSheetScrollView>
            ) : (
              children
            )}
          </View>
        </View>
      </View>
    </CustomBottomSheetModal>
  );
}

export const BottomModal = memo(BottomModalComponent);

import { useEffect, useRef, useState } from "react";
import { BottomModal } from "./BottomModal";
import { Picker } from "@react-native-picker/picker";
import { Button } from "./Button";
import { BottomNotch } from "./BottomNotch";
import { isAndroid } from "@/src/utils";
import { useColorScheme } from "@/src/hooks/useAppColorScheme";
import { useBottomModal } from "@/src/contexts/BottomModalContext";

export function Select({
  onClosed,
  title,
  value,
  options,
  onSelect,
  showButton,
  modalRef,
}: {
  onClosed: (value: string) => void;
  modalRef: any;
  title: string;
  options: {
    label: string;
    value: string;
  }[];
  onSelect: (value: string) => void;
  value: string;
  showButton?: boolean;
}) {
  const [selected, setSelected] = useState(value);

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const { closeModal } = useBottomModal();

  return (
    <BottomModal modalRef={modalRef} title={title} height="40%">
      <Picker
        selectedValue={selected}
        onValueChange={(itemValue, itemIndex) => {
          onSelect(itemValue);
          setSelected(itemValue);
        }}
        dropdownIconColor={isDark ? "white" : "black"}
      >
        {options.map((option, index) => (
          <Picker.Item
            key={index}
            label={option.label}
            value={option.value}
            color={isDark ? "white" : "black"}
            style={
              isAndroid
                ? { backgroundColor: !isDark ? "white" : "#292F3F" }
                : undefined
            }
          />
        ))}
      </Picker>

      {showButton && (
        <>
          <Button
            onPress={() => {
              onClosed(selected);
              closeModal(modalRef);
            }}
          >
            Continue
          </Button>
          <BottomNotch />
        </>
      )}
    </BottomModal>
  );
}

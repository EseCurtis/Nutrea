import { useState } from "react";
import { Input } from "./Input";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";

type DatePickerProps = {
  value?: Date | string;
  onChange: (value: string) => void;
  error?: any;
  label?: string;
  placeholder?: string;
  mode: "date" | "time" | "datetime";
  containerClassName?: string;
};

export function DatePicker({
  error,
  value,
  onChange,
  placeholder,
  label,
  mode,
  containerClassName,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Input
        label={label}
        placeholder={placeholder}
        error={error}
        value={
          value
            ? mode === "time"
              ? moment(value).format("hh:mm A")
              : moment(value).format("DD/MM/YYYY")
            : `Please select ${mode}`
        }
        right={
          mode === "date" ? (
            <Ionicons name="calendar-outline" size={24} color="black" />
          ) : (
            <Ionicons name="time-outline" size={24} color="black" />
          )
        }
        onPress={() => setIsOpen(true)}
        containerClassName={containerClassName}
      />

      <DateTimePickerModal
        mode={mode}
        isVisible={isOpen}
        onConfirm={(date: Date) => {
          onChange(date as any);
          setIsOpen(false);
        }}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );
}

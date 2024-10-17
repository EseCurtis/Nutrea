import { useState } from "react";
import { Input } from "./Input";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { Text } from "./Text";
import Svg, { Path, Defs, Stop, LinearGradient } from "react-native-svg";
import { CustomRadioSelect } from "./CustomRadioSelect";

type DatePickerProps = {
  value?: Date | string;
  onChange: (value: string) => void;
  error?: any;
  label?: string;
  placeholder?: string;
  mode: "date" | "time" | "datetime";
  containerClassName?: string;
  isStartDate?: boolean;
};

export function DatePicker({
  error,
  value,
  onChange,
  placeholder,
  label,
  mode,
  containerClassName,
  isStartDate,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <CustomRadioSelect
        options={[
          {
            title: value ? moment(value).format("DD/MM/YYYY") : "--/--/----",
            desc: "Tap to enter",
            icon: isStartDate ? <StartDate /> : <EndDate />,
            value: value,
            type: "tap",
          },
        ]}
        value={value}
        setValue={(val) => setIsOpen(true)}
      />

      <DateTimePickerModal
        mode={"date"}
        isVisible={isOpen}
        minimumDate={new Date()}
        onConfirm={(date: Date) => {
          onChange(date as any);
          setIsOpen(false);
        }}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );

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

function StartDate(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        opacity={0.4}
        d="M3 9v9c0 2 1 3 3 3h12c2 0 3-1 3-3V9H3z"
        fill="url(#paint0_linear_4779_17262)"
      />
      <Path
        d="M18 4.5h-1.25V3a.75.75 0 00-1.5 0v1.5h-6.5V3a.75.75 0 00-1.5 0v1.5H6c-2 0-3 1-3 3V9h18V7.5c0-2-1-3-3-3z"
        fill="url(#paint1_linear_4779_17262)"
      />
      <Path
        d="M12.374 11.978l.755 1.498a.39.39 0 00.293.209l1.743.248a.38.38 0 01.216.652l-1.26 1.202a.378.378 0 00-.112.339l.288 1.646c.058.334-.299.588-.604.43l-1.512-.777a.398.398 0 00-.362 0l-1.51.777c-.307.157-.665-.098-.606-.432l.288-1.644a.378.378 0 00-.112-.339l-1.26-1.202a.38.38 0 01.216-.652l1.743-.248a.387.387 0 00.293-.209l.755-1.498a.42.42 0 01.748 0z"
        fill="url(#paint2_linear_4779_17262)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_4779_17262"
          x1={3}
          y1={9}
          x2={21.5563}
          y2={9.93276}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#4622D9" />
          <Stop offset={1} stopColor="#6E50F0" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_4779_17262"
          x1={3}
          y1={2.25}
          x2={21.4558}
          y2={3.89926}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#4622D9" />
          <Stop offset={1} stopColor="#6E50F0" />
        </LinearGradient>
        <LinearGradient
          id="paint2_linear_4779_17262"
          x1={8.50049}
          y1={11.75}
          x2={15.7244}
          y2={12.0106}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#4622D9" />
          <Stop offset={1} stopColor="#6E50F0" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

function EndDate(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        opacity={0.4}
        d="M20 8v4.46c0 .207-.198.341-.395.28a5.439 5.439 0 00-1.866-.233c-2.785.123-5.111 2.449-5.234 5.234-.03.657.051 1.28.233 1.866.061.196-.073.395-.279.395H5c-2 0-3-1-3-3v-9h18V8z"
        fill="url(#paint0_linear_4779_17275)"
      />
      <Path
        d="M17 3.5h-1.25V2a.75.75 0 00-1.5 0v1.5h-6.5V2a.75.75 0 00-1.5 0v1.5H5c-2 0-3 1-3 3V8h18V6.5c0-2-1-3-3-3z"
        fill="url(#paint1_linear_4779_17275)"
      />
      <Path
        d="M7.02 13a1.005 1.005 0 01-1.005-1c0-.552.443-1 .995-1h.01a1 1 0 110 2zm5-1a1 1 0 00-1-1h-.01a.996.996 0 00-.995 1c0 .552.453 1 1.005 1a1 1 0 001-1zm-4 4a1 1 0 00-1-1h-.01a.996.996 0 00-.995 1c0 .552.453 1 1.005 1a1 1 0 001-1z"
        fill="url(#paint2_linear_4779_17275)"
      />
      <Path
        d="M18 14a4 4 0 100 8 4 4 0 000-8zm1.604 3.52l-1.667 1.667a.5.5 0 01-.708 0l-.833-.833a.5.5 0 01.707-.707l.479.48 1.313-1.313a.5.5 0 01.709.706z"
        fill="url(#paint3_linear_4779_17275)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_4779_17275"
          x1={2}
          y1={8}
          x2={20.5563}
          y2={8.93261}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#4622D9" />
          <Stop offset={1} stopColor="#6E50F0" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_4779_17275"
          x1={2}
          y1={1.25}
          x2={20.4558}
          y2={2.89926}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#4622D9" />
          <Stop offset={1} stopColor="#6E50F0" />
        </LinearGradient>
        <LinearGradient
          id="paint2_linear_4779_17275"
          x1={6.01465}
          y1={11}
          x2={12.214}
          y2={11.2079}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#4622D9" />
          <Stop offset={1} stopColor="#6E50F0" />
        </LinearGradient>
        <LinearGradient
          id="paint3_linear_4779_17275"
          x1={14}
          y1={14}
          x2={22.2588}
          y2={14.2768}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#4622D9" />
          <Stop offset={1} stopColor="#6E50F0" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

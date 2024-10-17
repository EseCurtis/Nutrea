import { Switch as DefaultSwitch, SwitchProps } from "react-native";

export function Switch(props: SwitchProps) {
  return (
    <DefaultSwitch
      trackColor={{ false: "#000080", true: "#4B1BA9" }}
      thumbColor="#fff"
      ios_backgroundColor={props.value ? "#6E50F0" : "#6E50F0"}
      {...props}
    />
  );
}

import { PressableProps } from "react-native";
import Svg, { Path } from "react-native-svg";
import { IconButtonBordered, IconButtonWithCheck } from "./IconButton";
import clsx from "clsx";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { useColorScheme } from "@/src/hooks/useAppColorScheme";

export function BackButton(props: PressableProps & { iconColor?: string }) {
  const colorScheme = useColorScheme();
  const card = useThemeColor({}, "card");

  return (
    <IconButtonBordered
      {...props}
      className={clsx(props.className, "border bg-transparent")}
    >
      <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.08513 9.81385L6.14435 10.7587L1.89258 6.52521L6.12606 2.27344L7.07093 3.21421L4.55322 5.74277L11.4237 5.72796C12.8964 5.72478 14.0929 6.91612 14.0961 8.38885L14.1075 13.7222L12.7742 13.7251L12.7627 8.39172C12.7611 7.65538 12.1629 7.05972 11.4265 7.06132L4.33602 7.07658L7.08513 9.81385Z"
          fill={props.iconColor ?? colorScheme === "dark" ? "#fff" : "#100C2A"}
        />
      </Svg>
    </IconButtonBordered>
  );
}

export function CheckButton(props: PressableProps) {
  const colorScheme = useColorScheme();

  return (
    <IconButtonWithCheck {...props}>
      <Svg width={24} height={25} viewBox="0 0 24 25" fill="none">
        <Path
          d="M9 18.172h-.004a.997.997 0 01-.708-.298l-4-4.062a.999.999 0 111.425-1.403l3.293 3.344 9.288-9.287a.999.999 0 111.414 1.414l-10 10a1.005 1.005 0 01-.708.292z"
          fill="#fff"
        />
      </Svg>
    </IconButtonWithCheck>
  );
}





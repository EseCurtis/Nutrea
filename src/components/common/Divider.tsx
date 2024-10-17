import clsx from "clsx";
import { View } from "react-native";
import { Path, Svg } from "react-native-svg";
import { Card } from "../cards/Card";

export function Divider(props: View["props"]) {
  return (
    <Card
      className={clsx(
        "w-full h-[0.8px] p-0 rounded-none my-4",
        props.className
      )}
      {...props}
    ></Card>
  );
}

export function DividerDashed({ width = 373 }: { width?: number }) {
  return (
    <Svg width={width} height="2" viewBox="0 0 373 2" fill="none">
      <Path
        opacity="0.1"
        d="M1.34961 1H372.35"
        stroke="#E2E8F0"
        strokeLinecap="round"
        strokeDasharray="2 2"
      />
    </Svg>
  );
}

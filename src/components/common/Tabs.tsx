import { Pressable, View } from "react-native";
import { Text } from "./Text";
import clsx from "clsx";
import { ScrollView } from "react-native-gesture-handler";

type Props = {
  tabs: {
    label: string;
    value: string | null;
  }[];
  selectedTab: string | null;
  onPress: (tab: { label: string; value: string | null }) => void;
  mode?: "primary" | "secondary";
};

export function Tabs({ tabs, selectedTab, onPress, mode = "primary" }: Props) {
  return (
    <View
      // horizontal
      // showsHorizontalScrollIndicator={false}
      className="flex flex-row gap-2 flex-wrap"
      // contentContainerStyle={{ alignItems: "center" }}
    >
      {tabs.map((tab) => (
        <Pressable
          className={clsx(
            "px-[18px] py-2.5 rounded-full justify-start items-start flex",
            selectedTab === tab.value
              ? mode === "primary"
                ? "bg-primary"
                : "bg-violet-200 dark:bg-[#37383D]"
              : "border-slate-300 dark:border-[#37383D] border bg-transparent"
          )}
          onPress={() => onPress(tab)}
          key={tab.value}
        >
          <Text
            fontWeight={selectedTab === tab.value ? "bold" : "medium"}
            className={clsx(
              "text-xs",
              selectedTab === tab.value
                ? mode === "primary"
                  ? "text-white"
                  : "text-primary dark:text-white"
                : "text-black dark:text-white"
            )}
          >
            {tab.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

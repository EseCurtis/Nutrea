import { TabBar, TabBarProps } from "react-native-tab-view";
import { window } from "../../constant";
import { Card } from "../cards/Card";
import { useColorScheme } from "@/src/hooks/useAppColorScheme";
import { useThemeColor } from "@/src/hooks/useThemeColor";

export const renderTabBar = (props: TabBarProps<any>) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const routes = props.navigationState.routes;

  const card = useThemeColor(
    {
      light: "#fff",
    },
    "card"
  );

  return (
    <Card
      className="m-0 rounded-full shadow-lg p-1 mb-2"
      style={{ borderRadius: 100, backgroundColor: card }}
    >
      <TabBar
        {...props}
        style={{
          height: 30,
          backgroundColor: "transparent",
        }}
        activeColor="#fff"
        inactiveColor={isDark ? "#fff" : "#000"}
        labelStyle={{
          fontSize: 14,
          fontFamily: "GreycliffCFBold",
          textTransform: "capitalize",
        }}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
        indicatorContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 100,
          // backgroundColor: isDark ? "#292F3F" : "#fff",
          // shadowColor: isDark ? "#fff" : "#000",
          // shadowOffset: {
          //   width: 0,
          //   height: 6,
          // },
          // shadowOpacity: 0.08,
          // shadowRadius: 8.3,
          // elevation: 10,
          // border-slate-100 dark:bg-[#292F3F] dark:border-[#191F2F] border
          // borderWidth: 1,
          // borderColor: isDark ? "#191F2F" : "#E5E5E5",
        }}
        indicatorStyle={{
          backgroundColor: "#4622D9",
          height: 30,
          borderRadius: 100,
          width: window.width / routes.length - 16,
          marginLeft: 0,
        }}
        tabStyle={{
          height: 30,
          marginHorizontal: "auto",
          marginBottom: 20,
          borderRadius: 100,
        }}
      />
    </Card>
  );
};

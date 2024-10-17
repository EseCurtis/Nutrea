import { Home, HomeColored } from "../components/icons/Home";
import { Discover, DiscoverColored } from "../components/icons/Discover";
import { Challenge, ChallengeColored } from "../components/icons/Challenge";
import { Shop, ShopActive } from "../components/icons/Shop";
import { Workout, WorkoutColored } from "../components/icons/Workout";
import { HomeStack } from "../navigation/BottomTabNavigator/HomeStack";
import { DiscoverStack } from "../navigation/BottomTabNavigator/DiscoverStack";
import { WorkoutsStack } from "../navigation/BottomTabNavigator/WorkoutsStack";
import { ChallengeStack } from "../navigation/BottomTabNavigator/ChallengeStack";
import { ShopStack } from "../navigation/BottomTabNavigator/ShopStack";

export function useTabs() {
  const tabs = [
    {
      name: "Home",
      icon: <Home />,
      activeIcon: <HomeColored />,
      component: HomeStack,
    },
    {
      name: "Discover",
      icon: <Discover />,
      activeIcon: <DiscoverColored />,
      component: DiscoverStack,
    },
    {
      name: "Workouts",
      icon: <Workout />,
      activeIcon: <WorkoutColored />,
      component: WorkoutsStack,
    },
    {
      name: "Challenge",
      icon: <Challenge />,
      activeIcon: <ChallengeColored />,
      component: ChallengeStack,
    },
    {
      name: "Shop",
      icon: <Shop />,
      activeIcon: <ShopActive />,
      component: ShopStack,
    },
  ];

  return {
    tabs,
  };
}

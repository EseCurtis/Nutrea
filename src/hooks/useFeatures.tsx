import { Text } from "../components/common/Text";

export function useFeatures() {
  const features = [
    {
      id: 1,
      title: (
        <>
          Get{" "}
          <Text fontWeight="extra-bold" className="text-primary text-[40px]">
            Fit
          </Text>{" "}
          & stay{" "}
          <Text fontWeight="extra-bold" className="text-primary text-[40px]">
            Healthy
          </Text>
        </>
      ),
      subtitle:
        "Earn GYM tokens with every exercise, burn calories in a fun, exciting way and be rewarded for it!",
      image: require("../assets/images/onboarding/onboarding_1.png"),
    },
    {
      id: 2,
      title: (
        <>
          Workout with{" "}
          <Text fontWeight="extra-bold" className="text-primary text-[40px]">
            Athletes
          </Text>
        </>
      ),
      subtitle:
        "Join viral challenges and get the most from your workouts with elite guidance from creators",
      image: require("../assets/images/onboarding/onboarding_2.png"),
    },
    {
      id: 3,
      title: (
        <>
          <Text fontWeight="extra-bold" className="text-primary text-[40px]">
            Transform
          </Text>{" "}
          your body
        </>
      ),
      subtitle: "Start earning as you train towards your dream body today!",
      image: require("../assets/images/onboarding/onboarding_3.png"),
    },
  ];

  return {
    features,
  };
}

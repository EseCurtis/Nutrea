import { useConnect, useLogin } from "@thirdweb-dev/react-native";

export function useThirdweb() {
  const { isLoading: loggingIn, login } = useLogin();
  const connect = useConnect();

  return {
    loggingIn,
    login,
    connect,
  };
}

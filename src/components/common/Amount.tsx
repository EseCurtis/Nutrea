import { Text } from "react-native";
import { formatAmount } from "../../utils/formatAmount";

export function Amount({
  amount,
  show = true,
  noDecimal,
}: {
  amount: string | number;
  show?: boolean;
  noDecimal?: boolean;
}) {
  return (
    <Text>
      {show
        ? formatAmount({
            value: amount,
            decimalPlaces: noDecimal ? 0 : 2,
          })
        : "*****"}
    </Text>
  );
}

import type { ScaledSize } from "react-native";
import { Dimensions } from "react-native";

import { isWeb } from "../utils";

export const HEADER_HEIGHT = 100;

export const ElementsText = {
  AUTOPLAY: "AutoPlay",
};

export const window: ScaledSize = isWeb
  ? {
      ...Dimensions.get("window"),
      width: 700,
    }
  : Dimensions.get("window");

export const LOCATION_TRACKING = "location-tracking";

export const imageBlurhash = "L6PZfSi_.AyE_3t7t7R**0o#DgR4";

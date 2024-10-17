import {
  Image as DefaultImage,
  ImageProps,
  ImageBackground as DefaultImageBackground,
} from "expo-image";
import { imageBlurhash } from "../../constant";

export function Image(props: ImageProps) {
  return (
    <DefaultImage
      placeholder={props.placeholder ?? imageBlurhash}
      transition={500}
      {...props}
    />
  );
}

export function ImageBackground(props: ImageProps) {
  return (
    <DefaultImageBackground
      {...props}
      placeholder={props.placeholder ?? imageBlurhash}
      transition={500}
    />
  );
}

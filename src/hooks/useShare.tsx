import Share, { ShareSingleOptions } from "react-native-share";
import moment from "moment";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { useToast } from "../contexts/ToastProvider";

export function useShare() {
  const { show } = useToast();

  const shareSingle = async (option: ShareSingleOptions) => {
    await Share.shareSingle(option);
  };

  const shareImageUri = async (uri: string) => {
    let date = moment().format("YYYYMMDDhhmmss");
    let fileUri = FileSystem.documentDirectory + `${date}.jpg`;
    try {
      const res = await FileSystem.downloadAsync(uri, fileUri);
      await Share.open({ url: res.uri });
    } catch (err) {
      console.log("FS Err: ", err);
    }
  };

  const shareText = async ({
    message,
    url,
  }: {
    message: string;
    url?: string;
  }) => {
    await Share.open({ message, url });
  };

  const saveImage = async (uri: string) => {
    try {
      // Request device storage access permission
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        // Save image to media library
        await MediaLibrary.saveToLibraryAsync(uri);

        show({
          message: "Image saved to gallery",
          type: "success",
        });
      }
    } catch (err) {
      console.log("FS Err: ", err);
    }
  };

  return {
    shareSingle,
    shareImageUri,
    shareText,
    saveImage,
  };
}

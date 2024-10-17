import { useState } from "react";
import axios, { AxiosProgressEvent } from "axios";
import { baseUrl, isAndroid } from "../../utils";
import { getErrorMessage } from "./useHandleError";
import { useToast } from "../../contexts/ToastProvider";
import {
  launchImageLibrary,
  ImagePickerResponse,
  launchCamera,
} from "react-native-image-picker";
import { PermissionsAndroid } from "react-native";
import { useStorage } from "../useStorage";

export const photoPermissionKey = "photoPermissionKey";

export function useUpload({
  defaultUrl,
  onDone,
}: {
  defaultUrl?: string;
  onDone?: (url: string, fileType?: FileType, id?: string) => void;
}) {
  const [file, setFile] = useState<string | undefined>(defaultUrl);
  const [fileType, setFileType] = useState<any>(null);
  const [originalUrl, setOriginalUrl] = useState<{
    url: string;
    fileType?: FileType;
  }>({
    url: "",
    fileType: undefined,
  });
  const [loading, setLoading] = useState(false);
  const { show } = useToast();

  const { get, save } = useStorage();

  const uploadFileFromUrl = async (uri: string, fileType?: FileType) => {
    const formData = new FormData() as any;

    console.log(uri, fileType, `image-${Math.random()}`);
    formData.append("file", {
      uri: uri,
      type: "image/jpeg",
      name: `image-${Math.random()}`,
    });

    setLoading(true);

    try {
      await axios
        .post(`${baseUrl}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            const progress =
              (progressEvent.loaded / (progressEvent.total ?? 100)) * 100;
            console.log("🚀 ~ uploadFile ~ progress:", progress);
          },
        })
        .then(({ data }) => {
          handleCompleteUpload({ data, type: "image/jpeg" });
        });
    } catch (error: any) {
      console.log("🚀 ~ uploadFile ~ error:", error);
      console.log(error?.response?.data, "error");
      const msg = getErrorMessage(error);
      show({
        type: "error",
        message: msg,
      });
    } finally {
      setLoading(false);
    }

    // axios({
    //   method: "post",
    //   url: `${baseUrl}/upload`,
    //   data: formData,
    // })
    //   .then(({ data }) => {
    //     handleCompleteUpload({
    //       data,
    //       type: fileType,
    //     });
    //   })
    //   .catch((error) => {
    //     const msg = getErrorMessage(error);
    //     console.log("error", error);
    //     show({
    //       type: "error",
    //       message: msg,
    //     });
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  };

  const uploadFile = async (type: "library" | "camera") => {
    let result: ImagePickerResponse;

    if (type === "library") {
      await launchImageLibrary(
        { mediaType: "photo", quality: 1 },
        (response) => {
          // console.log("Response : ", response);

          if (response.didCancel) {
            console.log("User cancelled image picker ");
          } else if (response.errorMessage) {
            show({
              type: "error",
              message: response.errorMessage,
            });
          } else if (response.errorCode) {
            show({
              type: "error",
              message: response.errorCode,
            });
          } else if (response.assets) {
            result = response;
          }
        }
      );
    } else {
      if (isAndroid) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "App Camera Permission",
            message: "App needs access to your camera ",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          await launchCamera({ mediaType: "photo", quality: 1 }, (response) => {
            // console.log("Response : ", response);

            if (response.didCancel) {
              console.log("User cancelled image picker ");
            } else if (response.errorMessage) {
              show({
                type: "error",
                message: response.errorMessage,
              });
            } else if (response.errorCode) {
              show({
                type: "error",
                message: response.errorCode,
              });
            } else if (response.assets) {
              result = response;
            }
          });
        } else {
          show({
            type: "error",
            message: "Camera permission denied",
          });
        }
      } else {
        await launchCamera({ mediaType: "photo", quality: 1 }, (response) => {
          // console.log("Response : ", response);

          if (response.didCancel) {
            console.log("User cancelled image picker ");
          } else if (response.errorMessage) {
            show({
              type: "error",
              message: response.errorMessage,
            });
          } else if (response.errorCode) {
            show({
              type: "error",
              message: response.errorCode,
            });
          } else if (response.assets) {
            result = response;
          }
        });
      }
    }

    if (result && !result?.didCancel) {
      const image = result?.assets?.[0];
      if (!image) {
        return setLoading(false);
      }
      // console.log("🚀 ~ uploadFile ~ image:", image);

      console.log({
        uri: image?.uri,
        type: image?.type,
        name: image?.fileName,
      });
      const formData = new FormData() as any;
      formData.append("file", {
        uri: image?.uri,
        type: image?.type,
        name: image?.fileName,
      });

      setLoading(true);

      try {
        await axios
          .post(`${baseUrl}/upload`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent: AxiosProgressEvent) => {
              const progress =
                (progressEvent.loaded / (progressEvent.total ?? 100)) * 100;
              console.log("🚀 ~ uploadFile ~ progress:", progress);
            },
          })
          .then(({ data }) => {
            handleCompleteUpload({ data, type });
          });
      } catch (error: any) {
        console.log("🚀 ~ uploadFile ~ error:", error);
        console.log(error?.response?.data, "error");
        const msg = getErrorMessage(error);
        show({
          type: "error",
          message: msg,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCompleteUpload = ({ data, type }: { data: any; type: any }) => {
    const res = data?.data;

    setFile(res.path ?? res.url);
    setFileType(type);
    onDone && onDone(res.path ?? res.url, type, res.id);
    setOriginalUrl({
      url: "",
      fileType: undefined,
    });
    setLoading(false);
  };

  const getPermission = async () => {
    const status = await get(photoPermissionKey);
    if (status !== "granted") {
      return false;
    }
    return true;
  };

  return {
    file,
    loading,
    uploadFile,
    originalUrl,
    fileType,
    cancelFile: () => {
      setFile(undefined);
      setFileType(null);
    },
    uploadFileFromUrl,
    getPermission,
  };
}

export type FileType = "image" | "video" | "audio";

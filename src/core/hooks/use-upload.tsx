/* eslint-disable max-lines-per-function */
import { Env } from '@env';
import { useState } from 'react';
import { PermissionsAndroid } from 'react-native';
import Upload from 'react-native-background-upload';
import RNFS from 'react-native-fs';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { IS_IOS, showErrorMessage } from '@/ui';

type UploadType = 'url' | 'library' | 'camera';

interface UseUploadProps {
  onDone: (data: File) => void;
  onFail?: (reason: string) => void;
  onSelectedImage?: (image: string) => void;
}

export interface File {
  created_at: string;
  format: string;
  height: number;
  id: string;
  path: string;
  resource_type: string;
  size: number;
  updated_at: string;
  blurhash: string;
  width: number;
}

interface UseUploadReturn {
  upload: (type: UploadType, url?: string) => void;
  isUploading: boolean;
  progress: number;
  cancel: () => void;
}

export const useUpload = ({
  onDone,
  onSelectedImage,
  onFail,
}: UseUploadProps): UseUploadReturn => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [uploadId, setUploadId] = useState('');

  const handleUpload = async (fileUri: string) => {
    setIsUploading(true);
    setProgress(0);
    onSelectedImage && onSelectedImage(fileUri);

    const options = {
      url: `${Env.API_URL}upload`,
      path: fileUri,
      method: 'POST',
      field: 'file',
      type: 'multipart',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      notification: {
        enabled: true,
      },
    };

    // @ts-ignore
    Upload.startUpload(options)
      .then((id) => {
        setUploadId(id);
        Upload.addListener('progress', id, (data) => {
          setProgress(Math.round(data.progress));
        });

        Upload.addListener('completed', id, (data) => {
          setIsUploading(false);
          setProgress(0);
          onDone(JSON.parse(data.responseBody)?.data);
        });

        Upload.addListener('error', id, (data) => {
          setIsUploading(false);
          setProgress(0);
          showErrorMessage('Failed to upload image');
          onFail && onFail('Failed to upload image');
          console.error('Upload failed', data.error);
        });

        Upload.addListener('cancelled', id, () => {
          setIsUploading(false);
          setProgress(0);
          onFail && onFail('Upload canceled');
          showErrorMessage('Upload canceled');
          console.log('Upload canceled');
        });
      })
      .catch((err) => {
        setIsUploading(false);
        setProgress(0);
        onFail && onFail('Upload canceled');
        showErrorMessage('Failed to upload image');
        console.error('Upload error', err);
      });
  };

  const downloadImage = async (url: string): Promise<string> => {
    const downloadPath = `${RNFS.TemporaryDirectoryPath}/${Math.random()
      .toString(36)
      .substring(7)}.jpg`;

    try {
      const result = await RNFS.downloadFile({
        fromUrl: url,
        toFile: downloadPath,
      }).promise;

      if (result.statusCode === 200) {
        return downloadPath;
      } else {
        showErrorMessage('Failed to upload image');
        throw new Error('Failed to download image');
      }
    } catch (error) {
      showErrorMessage('Image download failed');
      throw error;
    }
  };

  const upload = async (type: UploadType, url?: string) => {
    if (type === 'url' && url) {
      try {
        const localFilePath = await downloadImage(url);
        handleUpload(localFilePath);
      } catch (error) {
        showErrorMessage('Failed to upload image');
        console.error('Error downloading or uploading image:', error);
      }
    } else {
      const options = { mediaType: 'photo', quality: 0.7 };

      if (type === 'library') {
        // @ts-ignore
        launchImageLibrary(options, (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorCode) {
            showErrorMessage('Failed to upload image');
            console.error('ImagePicker Error: ', response.errorMessage);
          } else {
            const fileUri = response.assets?.[0]?.uri;
            if (fileUri) {
              handleUpload(fileUri);
            }
          }
        });
      } else if (type === 'camera') {
        if (!IS_IOS) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'App Camera Permission',
              message: 'App needs access to your camera',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );

          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            showErrorMessage('Camera permission denied');
            return;
          }
        }

        // @ts-ignore
        launchCamera(options, (response) => {
          if (response.didCancel) {
            console.log('User cancelled camera');
          } else if (response.errorCode) {
            console.error('Camera Error: ', response.errorMessage);
            showErrorMessage('Failed to upload image');
          } else {
            const fileUri = response.assets?.[0]?.uri;
            if (fileUri) {
              handleUpload(fileUri);
            }
          }
        });
      }
    }
  };

  const cancel = () => {
    if (uploadId) {
      Upload.cancelUpload(uploadId);
    }
  };

  return { upload, isUploading, progress, cancel };
};

import type { AxiosError } from 'axios';
import { Dimensions, Platform } from 'react-native';
import { showMessage } from 'react-native-flash-message';

export const IS_IOS = Platform.OS === 'ios';
export const isDev = process.env.NODE_ENV === 'development';
const { width, height } = Dimensions.get('screen');

export const WIDTH = width;
export const HEIGHT = height;

// for onError react queries and mutations
export const showError = (error: AxiosError) => {
  console.log(JSON.stringify(error?.response?.data));
  const description = extractError(error?.response?.data).trimEnd();

  showMessage({
    message: 'Error',
    description,
    type: 'danger',
    duration: 4000,
    icon: 'danger',
  });
};

export const showErrorMessage = (message: string = 'Something went wrong ') => {
  showMessage({
    message,
    type: 'danger',
    duration: 4000,
  });
};

export const extractError = (data: any): string => {
  if (typeof data === 'string') {
    return data;
  }
  // @ts-ignore
  if (data?.message) {
    // @ts-ignore
    return data.message;
  }

  if (Array.isArray(data?.message)) {
    const messages = data?.message?.map((item: any) => {
      return `  ${extractError(item)}`;
    });

    return `${messages.join('')}`;
  }

  if (typeof data?.message === 'object' && data?.message !== null) {
    const messages = Object.entries(data?.message).map((item) => {
      const [key, value] = item;
      const separator = Array.isArray(value) ? ':\n ' : ': ';

      return `- ${key}${separator}${extractError(value)} \n `;
    });
    return `${messages.join('')} `;
  }
  return 'Something went wrong ';
};

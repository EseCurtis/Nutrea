import { getItem, removeItem, setItem } from '@/core/storage';

const TOKEN = 'tokenssssssssssss';

export type TokenType = {
  access: string;
  refresh: string;
};

export type LoginDataType = {
  email?: string;
  password?: string;
  name?: string;
  username?: string;
  avatar?: string;
  walletAddress?: string;
  isNewUser?: boolean;
};

export enum AuthStepEnum {
  EMAIL = 'email',
  VERIFY_EMAIL = 'verify-email',
  PASSWORD = 'password',
  SETUP_PROFILE = 'setup-profile',
  AVATAR = 'avatar',
  COMPLETE = 'complete',
}

export const getToken = () => getItem<TokenType>(TOKEN);
export const removeToken = () => removeItem(TOKEN);
export const setToken = (value: TokenType) => setItem<TokenType>(TOKEN, value);

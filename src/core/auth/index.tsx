import { create } from 'zustand';

import type { User } from '@/api/auth';

import { createSelectors } from '../utils';
import type { LoginDataType, TokenType } from './utils';
import { AuthStepEnum, getToken, removeToken, setToken } from './utils';

interface AuthState {
  token: TokenType | null;
  status: 'idle' | 'signOut' | 'signIn';
  signIn: (data: TokenType) => void;
  signOut: () => void;
  hydrate: () => void;
  step: AuthStepEnum;
  setStep: (step: AuthStepEnum) => void;
  loginData?: LoginDataType | null;
  setLoginData: (data: LoginDataType) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  resetLoginData: () => void;
}

const _useAuth = create<AuthState>((set, get) => ({
  status: 'idle',
  token: null,
  signIn: (token) => {
    setToken(token);
    set({ status: 'signIn', token });
  },
  signOut: () => {
    removeToken();
    set({ status: 'signOut', token: null, user: null });
  },
  hydrate: async () => {
    try {
      const userToken = getToken();
      if (userToken !== null) {
        get().signIn(userToken);
      } else {
        get().signOut();
      }
    } catch (e) {
      // catch error here
      // Maybe sign_out user!
    }
  },
  step: AuthStepEnum.EMAIL,
  setStep: (step) => set({ step }),
  loginData: null,
  setLoginData: (data) => {
    set({
      loginData: {
        ...get().loginData,
        ...data,
      },
    });
  },
  user: null,
  setUser: (user) => set({ user }),
  resetLoginData: () => {
    set({ loginData: null, step: AuthStepEnum.EMAIL });
  },
}));

export const useAuth = createSelectors(_useAuth);

export const signOut = () => _useAuth.getState().signOut();
export const signIn = (token: TokenType) => _useAuth.getState().signIn(token);
export const hydrateAuth = () => _useAuth.getState().hydrate();
export const accessToken = () => _useAuth.getState().token;

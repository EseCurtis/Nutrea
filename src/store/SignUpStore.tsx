import { Store } from "pullstate";

export enum SignUpStep {
  EMAIL = "EMAIL",
  OTP = "OTP",
  NAME = "NAME",
  GENDER = "GENDER",
  AVATAR = "AVATAR",
  AGE = "AGE",
  WEIGHT = "WEIGHT",
  HEIGHT = "HEIGHT",
  NOTIFICATION = "NOTIFICATION",
  PASSWORD = "PASSWORD",
  PIN = "PIN"
}

export const SignUpStore = new Store<{
  email: string;
  name: string;
  username?: string;
  gender: "male" | "female" | "other" | null;
  avatar: string | null;
  age: any;
  weight: any;
  height: any;
  weightUnit: "kg" | "lbs" | null;
  notificationToken: string | null;
  password: string | null;
  confirmPassword: string | null;
  otp: string | null;
  referral: string | null;
  verifyEmailType: "register" | "forgot-password" | null;
  createPasswordType: "register" | "reset-password" | null;
  wallet_address: string | null;
  smart_account_address: string | null;
}>({
  email: "",
  name: "",
  username: "",
  gender: null,
  avatar: null,
  age: "0.00",
  weight: "0.00",
  height: "0.00",
  weightUnit: "kg",
  notificationToken: null,
  password: null,
  confirmPassword: null,
  otp: null,
  referral: null,
  verifyEmailType: null,
  createPasswordType: null,
  wallet_address: null,
  smart_account_address: ""
});

export interface User {
  id?: string;
  created_at?: string;
  updated_at?: string;
  email?: string;
  username?: string;
  provider?: string;
  twitter_username?: any;
  confirmation_token?: any;
  blocked?: boolean;
  roles?: string[];
  age?: number;
  avatar?: string;
  profile_image?: string;
  gender?: string;
  height?: number;
  name?: string;
  device_notification_token?: any;
  weight?: number;
  weight_unit?: string;
  workout_reminder_notification?: boolean;
  new_challenge_notification?: boolean;
  favourite_trainer_notification?: boolean;
  ref_code?: string;
  referrer_id?: any;
  about?: any;
  is_premium?: boolean;
  total_steps?: number;
  total_calories?: string;
  total_workouts?: number;
  total_workouts_uploaded?: number;
  total_courses_uploaded?: number;
  google_auth?: any;
  facebook_auth?: any;
  twitter_auth?: any;
  last_healthdata_updated_at?: any;
  total_followers?: number;
  total_following?: number;
  is_online?: boolean;
  last_online?: any;
  wallet?: Wallet;
  blocked_users_list?: string[];
  banner?: string;
  banner_blurhash?: string;
}

export interface Wallet {
  id?: string;
  created_at?: string;
  updated_at?: string;
  user_id?: string;
  balance?: string;
  symbol?: string;
  current_earn_streak?: string;
  last_earn_streak_at?: any;
}

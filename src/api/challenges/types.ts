import type { User } from '../auth';
import type { Group } from '../group';

export enum ChallengeType {
  AIRDROP = 'airdrop',
  PUBLIC = 'public',
  WEB3 = 'web3',
  PREMIUM = 'premium',
  RUN = 'run',
  WALK = 'walk',
  CYCLE = 'cycle',
}

export enum RewardModes {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  PERIODIC = 'periodic',
}

export enum LeaderboardMetric {
  STEPS = 'steps',
  DISTANCE = 'distance',
}

export enum DistanceUnit {
  METERS = 'meters',
  KM = 'km',
  MILES = 'miles',
}

export enum WithMeType {
  COMPETITIVE = 'competitive',
}

export enum ChallengePrivacy {
  PERSONAL = 'personal',
  CLUB = 'club',
}

export interface Challenge {
  name?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  reward?: string;
  distance?: string;
  image?: string;
  type?: ChallengeType;
  reward_mode?: RewardModes;
  is_started?: boolean;
  id?: string;
  deleted_at?: any;
  created_at?: string;
  updated_at?: string;
  total_participants?: number;
  is_ended?: boolean;
  leaderboard_metric?: LeaderboardMetric;
  steps?: number;
  user_id?: string;
  group_id?: string;
  banner_image?: string;
  user?: User;
  group?: Group;
  joinChallenges?: JoinedChallenge[];
  joined?: boolean;
}

export interface JoinedChallenge {
  id?: string;
  created_at?: string;
  updated_at?: string;
  user_id?: string;
  challenge_id?: string;
  distance?: string;
  last_distance?: string;
  steps?: number;
  last_steps?: string;
  calories?: string;
  earned?: string;
  last_earned?: string;
  left?: boolean;
  last_earned_at?: null;
  challenge?: Challenge;
  participant?: Participant;
}

export interface Participant {
  calories?: string;
  challenge_id?: string;
  created_at?: string;
  distance?: string;
  last_distance?: string;
  earned?: string;
  last_earned?: string;
  id?: string;
  last_earned_at?: any;
  left?: boolean;
  steps?: number;
  updated_at?: string;
  user_id?: string;
  user?: User;
  current_score?: number;
  prev_score?: number;
  challenge?: Challenge;
  daily_step_started?: boolean;
}

export interface RunWithMe {
  leaderboard_metric?: LeaderboardMetric;
  type?: any;
  privacy?: any;
  club_id?: any;
  distance?: number;
  time?: number;
  user_id?: string;
  distance_unit?: string;
}

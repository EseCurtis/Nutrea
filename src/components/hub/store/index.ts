import { create } from 'zustand';

import {
  ChallengePrivacy,
  DistanceUnit,
  LeaderboardMetric,
  type RunWithMe,
  WithMeType,
} from '@/api/challenges';
import { createSelectors } from '@/core';

interface State {
  createWithMeData: RunWithMe | null;
  setCreateWithMeData: (data: RunWithMe | null) => void;
}

const _useStore = create<State>((set, get) => ({
  createWithMeData: {
    leaderboard_metric: LeaderboardMetric.DISTANCE,
    type: WithMeType.COMPETITIVE,
    privacy: ChallengePrivacy.PERSONAL,
    club_id: '',
    distance: 100,
    time: 30,
    user_id: '',
    distance_unit: DistanceUnit.KM,
  },
  setCreateWithMeData: (data) => {
    if (data) {
      set({
        createWithMeData: {
          ...get().createWithMeData,
          ...data,
        },
      });
    } else {
      set({ createWithMeData: null });
    }
  },
}));

export const useHubStore = createSelectors(_useStore);

export const resetCreateWithMeData = () =>
  _useStore.getState().setCreateWithMeData({
    leaderboard_metric: LeaderboardMetric.DISTANCE,
    type: WithMeType.COMPETITIVE,
    privacy: ChallengePrivacy.PERSONAL,
    club_id: '',
    distance: 100,
    time: 30,
    user_id: '',
    distance_unit: DistanceUnit.KM,
  });

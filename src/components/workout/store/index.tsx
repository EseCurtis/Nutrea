import { create } from 'zustand';

import { createSelectors } from '@/core';

interface State {
  showShare: boolean;
  setShowShare: (show: boolean) => void;
}

const _useStore = create<State>((set, get) => ({
  showShare: false,
  setShowShare: (show) => set({ showShare: show }),
}));

export const useWorkoutStore = createSelectors(_useStore);

import React from 'react';

import { ImageBackground } from '@/ui';

export function RunSim() {
  return (
    <ImageBackground
      source={require('@/assets/pattern-bg.png')}
      className="h-full w-full"
    />
  );
}

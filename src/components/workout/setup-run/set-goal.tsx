import React, { useState } from 'react';

import { CircleSlider } from '@/ui';

export function SetGoal() {
  const [value, setValue] = useState(10);
  return <CircleSlider progress={value} setProgress={(e) => setValue(e)} />;
}

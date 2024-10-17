import React from 'react';

import { colors } from '@/ui';
import { DiscoverIcon } from '@/ui/icons/tabs/discover';
import { HomeIcon } from '@/ui/icons/tabs/home';
import { HubIcon } from '@/ui/icons/tabs/hub';
import { ShopIcon } from '@/ui/icons/tabs/shop';
import { WorkoutIcon } from '@/ui/icons/tabs/workout';

export function useTabItems() {
  const items = [
    {
      inactiveIcon: <HomeIcon />,
      activeIcon: <HomeIcon fill={colors.primary[500]} />,
      label: 'Home',
      route: 'index',
    },
    {
      inactiveIcon: <DiscoverIcon />,
      activeIcon: <DiscoverIcon fill={colors.primary[500]} />,
      label: 'Discover',
      route: 'discover',
    },
    {
      inactiveIcon: <WorkoutIcon />,
      activeIcon: <WorkoutIcon fill={colors.primary[500]} />,
      label: 'Workout',
      route: 'workout',
    },
    {
      inactiveIcon: <HubIcon />,
      activeIcon: <HubIcon fill={colors.primary[500]} />,
      label: 'Hub',
      route: 'hub',
    },
    {
      inactiveIcon: <ShopIcon />,
      activeIcon: <ShopIcon fill={colors.primary[500]} />,
      label: 'Shop',
      route: 'shop',
    },
  ];

  const getItems = (start: number, stop: number) => {
    return items.slice(start, stop);
  };

  return {
    items,
    getItems,
  };
}

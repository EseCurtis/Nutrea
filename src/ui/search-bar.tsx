import React from 'react';

import { Input } from './input';

export function SearchBar() {
  return (
    <Input
      placeholder="Search"
      className="h-[56px] text-left text-[17px] font-medium"
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ backgroundColor: '#2E2E2E' }}
    />
  );
}

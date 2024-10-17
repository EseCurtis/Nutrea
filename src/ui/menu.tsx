import type { MenuComponentProps } from '@react-native-menu/menu';
import { MenuView } from '@react-native-menu/menu';
import React from 'react';

export function Menu(props: MenuComponentProps) {
  return (
    <MenuView shouldOpenOnLongPress={false} themeVariant="dark" {...props} />
  );
}

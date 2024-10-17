/* eslint-disable react/no-unstable-nested-components */
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '@/ui';

import { LobbyMemberItem } from './lobby-member-item';

export const LobbyMembersList = forwardRef((myProps, ref) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        open: () => {
          bottomSheetRef.current?.expand();
        },
        close: () => {
          bottomSheetRef.current?.close();
        },
      };
    },
    []
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={['60%', '100%']}
      index={0}
      handleComponent={() => <></>}
      backgroundStyle={styles.background}
    >
      <BottomSheetFlatList
        ListHeaderComponent={
          <View className="p-6">
            <Text className="font-medium">Members ( 20 )</Text>
          </View>
        }
        data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
        renderItem={({ index }) => <LobbyMemberItem key={index} />}
        ItemSeparatorComponent={() => <View className="h-6" />}
        showsVerticalScrollIndicator={false}
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{ paddingBottom: 120 }}
      />
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  background: {
    borderTopRightRadius: 36,
    borderTopLeftRadius: 36,
    overflow: 'hidden',
    backgroundColor: '#0F0F0F',
  },
});

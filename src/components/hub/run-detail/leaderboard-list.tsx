/* eslint-disable react/no-unstable-nested-components */
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { StyleSheet } from 'react-native';

import { LeaderboardItem } from '@/components/workout';
import { Text, View } from '@/ui';

import { LeadersRock } from './leaders-rock';

export const LeaderboardList = forwardRef((myProps, ref) => {
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
      snapPoints={['45%', '100%']}
      index={0}
      backgroundStyle={styles.background}
    >
      <BottomSheetFlatList
        ListHeaderComponent={
          <View className="p-6 pt-0">
            <Text className="text-center font-medium">
              Drag up to see Leaderboard
            </Text>
            <LeadersRock />
          </View>
        }
        data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
        renderItem={({ index }) => (
          <View className="px-6">
            <LeaderboardItem key={index} />
          </View>
        )}
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

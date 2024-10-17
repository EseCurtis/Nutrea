import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';

import {
  InviteFriendsButton,
  SelectType,
  SetGoal,
} from '@/components/workout/setup-run';
import { useWorkoutStore } from '@/components/workout/store';
import { AppBar, BottomNotch, Button, TabBar, useModal, View } from '@/ui';
import { ShareLinkModal } from '@/ui/share-link-modal';

export default function SetupRun() {
  const [tab, setTab] = useState(0);
  const { ref, present } = useModal();
  const { setShowShare, showShare } = useWorkoutStore();

  useEffect(() => {
    if (showShare) {
      present();
    }
  }, [present, showShare]);

  return (
    <View className="flex-1">
      <AppBar onBack={router.back} title="Setup Run" />
      <View className="flex-1 gap-8 pt-4">
        <TabBar
          tabs={[{ title: 'Distance' }, { title: 'Time' }]}
          activeTab={tab}
          onTabPress={(e) => setTab(e)}
        />
        <SetGoal />
        <View className="gap-4 px-6">
          <SelectType />
          <InviteFriendsButton />
        </View>
      </View>

      <View className="flex-row items-center justify-between px-6">
        <Button className="w-2/5 bg-[#565656]" variant="secondary">
          Save for later
        </Button>
        <Button
          onPress={() => router.push('/workout/sim')}
          variant="secondary"
          className="w-[58%]"
          withIcon
        >
          Start Run
        </Button>
      </View>
      <BottomNotch />
      <ShareLinkModal modalRef={ref} onDismiss={() => setShowShare(false)} />
    </View>
  );
}

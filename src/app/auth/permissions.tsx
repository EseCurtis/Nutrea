/* eslint-disable max-lines-per-function */
import { Link } from 'expo-router';
import { router } from 'expo-router';
import React, { useState } from 'react';

import { useUpdateUser } from '@/api/auth/use-update-user';
import { StepTitle } from '@/components/login';
import { getPushNotificationToken } from '@/core/services/notification';
import {
  BottomNotch,
  Button,
  Image,
  ListItem,
  showError,
  Switch,
  TopNotch,
  View,
} from '@/ui';

export default function Permissions() {
  const [grantHealthAccess, setGrantHealthAccess] = useState(false);
  const [grantNotificationAccess, setGrantNotificationAccess] = useState(false);
  const [notificationToken, setNotificationToken] = useState('');

  const accesses = [
    {
      title: 'Notifications',
      description: 'Descriptive text',
      icon: require('@/assets/icons/bell.png'),
      checked: grantNotificationAccess,
      onPress: () => setGrantNotificationAccess(!grantNotificationAccess),
    },
    {
      title: 'Apple Health',
      description: 'Descriptive text',
      icon: require('@/assets/icons/health-kit.png'),
      checked: grantHealthAccess,
      onPress: () => setGrantHealthAccess(!grantHealthAccess),
    },
  ];

  const { mutate, isPending } = useUpdateUser({
    onSuccess: () => {
      router.push('/auth/login-completed');
    },
    onError: (e) => {
      console.log(e.config);
      showError(e);
    },
  });

  const handleGrantAccess = async () => {
    try {
      if (grantNotificationAccess) {
        await getPushNotificationToken().then((token) => {
          if (token) {
            setNotificationToken(token);
          }
        });
      }
      if (grantHealthAccess) {
      }
    } catch (error) {
      console.log(error);
    } finally {
      mutate({ device_notification_token: notificationToken });
    }
  };

  return (
    <View className="flex-1">
      <TopNotch />
      <View className="flex-1 items-center justify-center gap-[100px]">
        <StepTitle
          title="Grant Access"
          description="Athlerse works best with access to the following permission"
        />

        <View className="flex w-full flex-col gap-[50px] px-6">
          {accesses.map((item, index) => (
            <ListItem
              key={index}
              title={item?.title}
              description={item?.description}
              leftItem={
                <Image source={item.icon} className="h-[33px] w-[33px]" />
              }
              rightItem={
                <Switch
                  checked={item?.checked}
                  onChange={() => item.onPress()}
                  accessibilityLabel={item.title}
                />
              }
            />
          ))}
        </View>
      </View>
      <View className="gap-4 px-6">
        <Button withIcon onPress={handleGrantAccess} loading={isPending}>
          Grant Access
        </Button>
        <Link
          href="/auth/login-completed"
          className="p-4 text-center font-sf-pro-medium text-[17px] text-white"
        >
          Remind me later
        </Link>
      </View>
      <BottomNotch />
    </View>
  );
}

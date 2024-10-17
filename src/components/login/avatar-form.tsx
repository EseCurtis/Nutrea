/* eslint-disable max-lines-per-function */
import { Env } from '@env';
import type { ImageSource } from 'expo-image';
import { router } from 'expo-router';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { twMerge } from 'tailwind-merge';

import { useRegister } from '@/api/auth';
import { useAuth, useUpload } from '@/core';
import {
  BottomNotch,
  Button,
  colors,
  Image,
  Pressable,
  showErrorMessage,
  Text,
  View,
} from '@/ui';
import { Menu } from '@/ui/menu';

import { StepTitle } from './step-title';

export const AvatarForm = () => {
  const avatars = [
    {
      name: 'athlerse-avatar-1',
      image: require('@/assets/icons/athlerse-avatar-1.png'),
      uri: 'https://res.cloudinary.com/digital-specie/image/upload/v1724419901/athlerse-avatar-1_d0phtg.png',
    },
    {
      name: 'athlerse-avatar-2',
      image: require('@/assets/icons/athlerse-avatar-2.png'),
      uri: 'https://res.cloudinary.com/digital-specie/image/upload/v1724419901/athlerse-avatar-2_qhwda8.png',
    },
    {
      name: 'athlerse-avatar-3',
      image: require('@/assets/icons/athlerse-avatar-3.png'),
      uri: 'https://res.cloudinary.com/digital-specie/image/upload/v1724419901/athlerse-avatar-3_hrxhja.png',
    },
    {
      name: 'athlerse-avatar-4',
      image: require('@/assets/icons/athlerse-avatar-4.png'),
      uri: 'https://res.cloudinary.com/digital-specie/image/upload/v1724420086/athlerse-avatar-4_q7h6an.png',
    },
  ];

  const pickerActions = [
    {
      id: 'library',
      title: 'Choose from library',
    },
    {
      id: 'camera',
      title: 'Take a photo',
    },
  ];

  const { signIn, setUser, setLoginData, loginData } = useAuth();

  const [avatar, setAvatar] = useState<ImageSource>(
    require('@/assets/icons/profile-circle.png')
  );
  const [selectedAvatarName, setSelectedAvatarName] = useState<string | null>(
    null
  );

  const { upload, isUploading, progress, cancel } = useUpload({
    onDone: (data) => {
      setLoginData({ avatar: data?.path });
      setSelectedAvatarName(null);
    },
    onSelectedImage: (img) => setAvatar({ uri: img }),
    onFail: () => setAvatar(require('@/assets/icons/profile-circle.png')),
  });

  const data = {
    ...loginData,
    avatar: selectedAvatarName ? selectedAvatarName : loginData?.avatar,
    wallet_address: loginData?.walletAddress,
  };

  const { mutate, isPending } = useRegister({
    onSuccess: (e) => {
      signIn({ access: e?.data?.token, refresh: 'dddd' });
      setUser(e?.data?.user);
      router.push('/auth/permissions');
    },
    onError: () => {
      showErrorMessage('An error occurred');
    },
  });

  return (
    <>
      <View className="flex-1 p-4">
        <StepTitle
          title="Choose Avatar"
          description="Enter the name you would like to go by"
        />

        <View className="relative">
          <View className="relative mx-auto mt-6 h-[188px] w-[188px] items-center justify-center rounded-full">
            <MotiView
              key={avatar as string}
              from={{ translateY: 10, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              className="absolute pt-6"
            >
              <Image
                source={avatar}
                className="h-[172px] w-[172px] rounded-full"
                contentFit="cover"
              />

              {isUploading && (
                <View className="absolute top-6 h-full w-full items-end justify-end overflow-hidden rounded-full">
                  <MotiView
                    className="relative w-full items-center justify-center"
                    from={{ height: '0%' }}
                    animate={{ height: `${progress}%` }}
                    transition={{ duration: 1000 }}
                    id={`percent-${progress}`}
                    style={styles.uploadProgress}
                  >
                    <Text className="text-center text-sm font-bold text-primary-500">
                      {progress}%
                    </Text>
                  </MotiView>
                </View>
              )}
            </MotiView>

            <Border />
          </View>

          <View className="absolute -bottom-2 left-0 w-full items-center justify-center">
            {isUploading ? (
              <Pressable
                onPress={() => {
                  cancel();
                  setAvatar(require('@/assets/icons/profile-circle.png'));
                }}
                className="w-[105px] rounded-full border-4 border-black bg-card p-1"
              >
                <Text className="text-center text-sm font-medium">
                  Cancel upload
                </Text>
              </Pressable>
            ) : (
              <Menu
                actions={pickerActions}
                onPressAction={({ nativeEvent }) => {
                  upload(nativeEvent?.event as any);
                }}
              >
                <View className="w-[105px] rounded-full border-4 border-black bg-primary-500 p-1">
                  <Text className="text-center text-sm font-medium">
                    Upload Photo
                  </Text>
                </View>
              </Menu>
            )}
          </View>
        </View>

        <Text className="mb-6 mt-16 text-center font-medium">
          or choose {Env.NAME?.toLowerCase()} avatars
        </Text>

        <View className="flex-row items-center justify-center gap-4 px-4">
          {avatars?.map((item, index) => (
            <Pressable
              key={index}
              className={twMerge(
                'h-[80px] w-[80px] items-center justify-center rounded-full border-2 border-dashed',
                avatar === item?.image && 'border-white'
              )}
              onPress={() => {
                setAvatar(item.image);
                setSelectedAvatarName(item.uri);
              }}
            >
              <Image
                source={item?.image}
                className="h-[68px] w-[68px] rounded-full"
              />
            </Pressable>
          ))}
        </View>
      </View>

      <View className="px-4">
        <Button
          testID="login-button"
          onPress={() => {
            mutate(data);
          }}
          withIcon
          loading={isPending}
        >
          Continue
        </Button>
        <BottomNotch />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  uploadProgress: { backgroundColor: 'rgba(255,255,255,0.7)' },
});

function Border() {
  return (
    <Svg width={192} height={171} viewBox="0 0 192 171" fill="none">
      <Path
        d="M155.325 169C176.485 151.764 190 125.501 190 96.081c0-51.915-42.085-94-94-94s-94 42.085-94 94c0 28.871 13.016 54.703 33.5 71.946"
        stroke={colors.primary[500]}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="8 10"
      />
    </Svg>
  );
}

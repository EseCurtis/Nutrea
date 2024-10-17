/* eslint-disable max-lines-per-function */
import * as Linking from 'expo-linking';
import React, { useState } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { useConnect } from 'thirdweb/react';
import { inAppWallet } from 'thirdweb/wallets';

import { useSocialLogin } from '@/api/auth';
import { chain, client } from '@/core/thirdweb';
import { colors, showError, Text } from '@/ui';
import { Apple, Facebook, Google, Twitter } from '@/ui/icons';

export function SocialButtons() {
  const icons = [
    {
      icon: <Apple />,
      provider: 'apple',
    },
    {
      icon: <Google />,
      provider: 'google',
    },
    {
      icon: <Twitter />,
      provider: 'discord',
    },
    {
      icon: <Facebook />,
      provider: 'facebook',
    },
  ];

  const [isLoading, setIsLoading] = useState<string | null>(null);

  const { connect } = useConnect();
  const { mutateAsync } = useSocialLogin({
    onSuccess: (e) => {},
    onError: (e) => {
      showError(e);
    },
  });

  const handleSignIn = async (provider: 'google' | 'apple' | 'facebook') => {
    try {
      setIsLoading(provider);
      const connectWallet = await connect(async () => {
        const wallet = inAppWallet({
          smartAccount: {
            chain: chain,
            sponsorGas: true,
          },
        });
        await wallet.connect({
          client: client,
          strategy: provider,
          redirectUrl: Linking.createURL(''),
        });
        return wallet;
      });

      if (connectWallet) {
        const account = await connectWallet.getAccount();
        console.log(account);
        await mutateAsync({ provider, wallet_address: account?.address! });
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <>
      <Text className="my-8 text-center text-[#6C727F]">
        Or continue with social account
      </Text>
      <View className="flex-row items-center justify-center gap-4">
        {icons?.map((icon, index) => (
          <Pressable
            className="h-[60px] w-[60px] items-center justify-center rounded-full bg-white"
            key={index}
            onPress={() => handleSignIn(icon.provider as any)}
          >
            {isLoading === icon?.provider ? (
              <ActivityIndicator size="small" color={colors.primary[500]} />
            ) : (
              icon?.icon
            )}
          </Pressable>
        ))}
      </View>
    </>
  );
}

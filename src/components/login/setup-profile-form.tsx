import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useCheckUsername } from '@/api/auth';
import { useAuth } from '@/core';
import { AuthStepEnum } from '@/core/auth/utils';
import { Button, ControlledInput, Text, View } from '@/ui';

import { StepTitle } from './step-title';

const schema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  username: z.string({
    required_error: 'Username is required',
  }),
});

type FormType = z.infer<typeof schema>;

export const SetupProfileForm = () => {
  const { handleSubmit, control, setError } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const [username, setUsername] = useState('');

  const { setStep, setLoginData } = useAuth();
  const { mutate, isPending } = useCheckUsername();

  const onSubmit = (data: FormType) => {
    mutate(data, {
      onSuccess: (e) => {
        if (e?.data === 'available') {
          setLoginData(data);
          setStep(AuthStepEnum.AVATAR);
        } else {
          setError('username', {
            message: 'Username already taken, try a different username',
          });
        }
      },
      onError: (e) => {
        console.log(e?.response?.data);
        setError('username', {
          message: 'Username already taken, try a different username',
        });
      },
    });
  };

  return (
    <View className="flex-1 p-4">
      <StepTitle
        title="Setup Profile"
        description="Enter the name you would like to go by"
      />
      <View className="mt-6">
        <ControlledInput
          control={control}
          name="name"
          placeholder="Your name"
          autoFocus
        />
      </View>
      <View className="my-6">
        <ControlledInput
          control={control}
          name="username"
          placeholder="@username"
          rightItems={
            <Text className="text-[#3A3A3A]">{username?.length}/10</Text>
          }
          onChangeText={(e) => setUsername(e)}
          maxLength={10}
        />
      </View>
      <Button
        testID="login-button"
        className="mt-4"
        onPress={handleSubmit(onSubmit)}
        loading={isPending}
        withIcon
      >
        Continue
      </Button>
    </View>
  );
};

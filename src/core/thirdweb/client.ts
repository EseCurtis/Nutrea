import { Env } from '@env';
import { createThirdwebClient } from 'thirdweb';
import { base } from 'thirdweb/chains';

const clientId = Env.THIRDWEB_CLIENT_ID;

if (!clientId) {
  throw new Error(
    'Missing EXPO_PUBLIC_THIRDWEB_CLIENT_ID - make sure to set it in your .env file'
  );
}

export const client = createThirdwebClient({
  clientId,
});

export const chain = base;

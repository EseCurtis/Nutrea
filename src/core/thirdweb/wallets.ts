import { base } from 'thirdweb/chains';
import { createWallet } from 'thirdweb/wallets';
import { inAppWallet } from 'thirdweb/wallets/in-app';

export const wallets = [
  inAppWallet({
    auth: {
      passkeyDomain: 'thirdweb.com',
      options: ['apple', 'email', 'facebook', 'google'],
    },
    smartAccount: {
      chain: base,
      sponsorGas: true,
    },
  }),
  createWallet('io.metamask'),
  createWallet('com.coinbase.wallet', {
    appMetadata: {
      name: 'Thirdweb RN Demo',
    },
    mobileConfig: {
      callbackURL: 'https://thirdweb.com',
    },
  }),
  createWallet('me.rainbow'),
  createWallet('com.trustwallet.app'),
  createWallet('io.zerion.wallet'),
];

import { createThirdwebClient, getContract } from "thirdweb";
import { base } from "thirdweb/chains";

const thirdwebClientId = "71f601c73924efcc3493eb3fc6356430";

if (!thirdwebClientId) {
  throw new Error(
    "Missing EXPO_PUBLIC_THIRDWEB_CLIENT_ID - make sure to set it in your .env file"
  );
}

export const thirdwebClient = createThirdwebClient({
  clientId: thirdwebClientId,
});

export const thirdwebChain = base;

export const contract = getContract({
  client: thirdwebClient,
  address: "0x82e50a6BF13A70366eDFC871f8FB8a428C43Dc03",
  chain: thirdwebChain,
});

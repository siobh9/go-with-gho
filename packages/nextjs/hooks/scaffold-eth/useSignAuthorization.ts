import { useAccount, useSignMessage } from "wagmi";

export const useSignAuthorization = () => {
  const { address: connectedAddress } = useAccount();
  const { data: signedMessageData, signMessage, isSuccess: signingSuccessful } = useSignMessage();

  const signAuthorization = async () => {
    const authorizationMessage = {
      /** Address of the contract to delegate to. */
      address: connectedAddress,
      /** Chain ID. */
      chainId: 2,
      /** Nonce of the EOA to delegate to. */
      nonce: 1,
    };

    signMessage({ message: JSON.stringify(authorizationMessage) });
  };

  return { signAuthorization, signedMessageData, signingSuccessful };
};

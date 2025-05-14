import { useSignMessage } from "wagmi";
import { contractAddress } from "~~/utils/scaffold-eth/abi";

export const useSignAuthorization = () => {
  const { data: signedMessageData, signMessage, isSuccess: signingSuccessful } = useSignMessage();

  const signAuthorization = async () => {
    const authorizationMessage = {
      /** Address of the contract to delegate to. */
      address: contractAddress,
      /** Chain ID. */
      chainId: 31337,
      /** Nonce of the EOA to delegate to. */
      nonce: 1,
    };

    signMessage({ message: JSON.stringify(authorizationMessage) });
  };

  return { signAuthorization, signedMessageData, signingSuccessful };
};

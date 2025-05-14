import { createWalletClient, http, encodeFunctionData, Authorization, Address } from "viem";
import { sepolia } from "viem/chains";
import { useAccount, useSignMessage } from "wagmi";

export const useSignAuthorization = () => {
  const { address: connectedAddress } = useAccount();
  const { data: signedMessageData, error, signMessage, variables, isSuccess: signingSuccessful } = useSignMessage();

  const signAuthorization = async () => {
    const walletClient = createWalletClient({
      account: connectedAddress ?? '',
      chain: sepolia,
      transport: http(),
    });

    const authorizationMessage = {
        /** Address of the contract to delegate to. */
        address: walletClient.account.address,
        /** Chain ID. */
        chainId: 2,
        /** Nonce of the EOA to delegate to. */
        nonce: 1
    };

    signMessage({message: JSON.stringify(authorizationMessage)});
  };

  return { signAuthorization, signedMessageData, signingSuccessful };
};

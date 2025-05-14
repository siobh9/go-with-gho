import { createWalletClient, encodeFunctionData, http } from "viem";
import { anvil } from "viem/chains";
import { useAccount } from "wagmi";
import { abi, contractAddress } from "~~/utils/scaffold-eth/abi";

export const useSendAuthorizedTx = () => {
  const { address: connectedAddress } = useAccount();

  // TODO: make it so that chain is whatever the user's connected to
  const sendAuthorizedTx = async (signedMessage: string) => {
    const walletClient = createWalletClient({
      account: connectedAddress ?? "",
      chain: anvil,
      transport: http(),
    });

    // needs to be type Authorization<uint32, true> as in packages/nextjs/node_modules/viem/accounts/utils/signAuthorization.ts
    // TODO: needs to include r, s, and yParity
    const authorization = {
      /** Address of the contract to delegate to. */
      address: contractAddress,
      /** Chain ID. */
      chainId: 31337,
      /** Nonce of the EOA to delegate to. */
      nonce: 1,
      signedMessage,
    };

    console.log(authorization);

    await walletClient.sendTransaction({
      authorizationList: [authorization],
      data: encodeFunctionData({
        abi,
        functionName: "initialize",
      }),
      to: walletClient.account.address,
    });
  };

  return { sendAuthorizedTx };
};

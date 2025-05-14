import { createWalletClient, http, encodeFunctionData } from "viem";
import { sepolia } from "viem/chains";
import { useAccount } from "wagmi";
import { abi, contractAddress } from "~~/utils/scaffold-eth/abi";

export const useSendAuthorizedTx = () => {
  const { address: connectedAddress } = useAccount();

  const sendAuthorizedTx = async (signedMessage: string) => {
    const walletClient = createWalletClient({
      account: connectedAddress ?? '0xd698e31229aB86334924ed9DFfd096a71C686900',
      chain: sepolia,
      transport: http(),
    });
  
    // needs to be type Authorization<uint32, true> as in packages/nextjs/node_modules/viem/accounts/utils/signAuthorization.ts
    const authorization = {
        /** Address of the contract to delegate to. */
        address: contractAddress,
        /** Chain ID. */
        chainId: 1,
        /** Nonce of the EOA to delegate to. */
        nonce: 1,
        signedMessage
    };

    console.log(authorization)

    await walletClient.sendTransaction({
      authorizationList: [authorization],
      data: encodeFunctionData({
        abi,
        functionName: 'initialize',
      }),
      to: walletClient.account.address,
    })

  };

  return { sendAuthorizedTx };
};

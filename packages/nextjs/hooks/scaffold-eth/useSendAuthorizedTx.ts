import { createWalletClient, http, encodeFunctionData, Authorization, Address } from "viem";
import { sepolia } from "viem/chains";
import { useAccount, useSignMessage } from "wagmi";
import { abi, contractAddress } from "~~/utils/scaffold-eth/abi";

export const useSendAuthorizedTx = () => {
  const { address: connectedAddress } = useAccount();
  const { data: signMessageData, error, signMessage, variables } = useSignMessage();

  const useSendAuthorizedTx = async () => {
    const walletClient = createWalletClient({
      account: connectedAddress ?? '0xd698e31229aB86334924ed9DFfd096a71C686900',
      chain: sepolia,
      transport: http(),
    });

    signMessage({message: "test message"});

    // const authorizationPrep = await walletClient.prepareAuthorization({ 
    //   contractAddress: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', 
    // })
  
    // const authorization = await walletClient.signAuthorization({
    //   contractAddress,
    //   executor: 'self',
    // })
  
    // needs to be type Authorization<uint32, true> as in packages/nextjs/node_modules/viem/accounts/utils/signAuthorization.ts
    const authorization = {
        /** Address of the contract to delegate to. */
        address: walletClient.account.address,
        /** Chain ID. */
        chainId: 2,
        /** Nonce of the EOA to delegate to. */
        nonce: 1,
        signMessageData
    };

    console.log(authorization)

    // await walletClient.sendTransaction({
    //   authorizationList: [authorization],
    //   data: encodeFunctionData({
    //     abi,
    //     functionName: 'initialize',
    //   }),
    //   to: walletClient.account.address,
    // })

  };

  return { useSendAuthorizedTx };
};

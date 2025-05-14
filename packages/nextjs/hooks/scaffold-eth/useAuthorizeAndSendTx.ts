import { createWalletClient, http, encodeFunctionData } from "viem";
import { sepolia } from "viem/chains";
import { useAccount, useSignMessage } from "wagmi";

export const useAuthorizeAndSendTx = () => {
  const { address: connectedAddress } = useAccount();
  const { data: signMessageData, error, signMessage, variables } = useSignMessage();

  const authorizeAndSendTx = async () => {
    const walletClient = createWalletClient({
      account: connectedAddress ?? '0xd698e31229aB86334924ed9DFfd096a71C686900',
      chain: sepolia,
      transport: http(),
    });

    const authorization = signMessage({message: "test message"});

    // const authorizationPrep = await walletClient.prepareAuthorization({ 
    //   contractAddress: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', 
    // })
  
    // const authorization = await walletClient.signAuthorization({
    //   contractAddress,
    //   executor: 'self', 
    // })
  
    // await walletClient.sendTransaction({
    //   authorizationList: [authorization],
    //   data: encodeFunctionData({
    //     abi,
    //     functionName: 'initialize',
    //   }),
    //   to: walletClient.account.address, 
    // })

  };

  return { authorizeAndSendTx };
};

import { bytesToHex, createWalletClient, encodeFunctionData, hexToBytes, http } from "viem";
import { anvil } from "viem/chains";
import { useAccount } from "wagmi";
import { abi, contractAddress } from "~~/utils/scaffold-eth/abi";

export const useSendAuthorizedTx = () => {
  const { address: connectedAddress } = useAccount();

  // TODO: make it so that chain is whatever the user's connected to
  const sendAuthorizedTx = async (signedMessage: `0x${string}`) => {
    const walletClient = createWalletClient({
      account: connectedAddress ?? "",
      chain: anvil,
      transport: http(),
    });

    const sigBytes = hexToBytes(signedMessage);

    const r = sigBytes.slice(0, 32); // First 32 bytes
    const s = sigBytes.slice(32, 64); // Next 32 bytes
    const yParity = sigBytes[64] == 27 ? 0x0 : 0x1; // Final byte (recovery id)

    // needs to be type Authorization<uint32, true> as in packages/nextjs/node_modules/viem/accounts/utils/signAuthorization.ts
    // TODO: needs to include r, s, and yParity
    const authorization = {
      /** Address of the contract to delegate to. */
      address: contractAddress,
      /** Chain ID. */
      chainId: 31337,
      /** Nonce of the EOA to delegate to. */
      nonce: 1,
      r: bytesToHex(r),
      s: bytesToHex(s),
      yParity: yParity,
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

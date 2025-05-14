import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { coinbaseWallet, ledgerWallet, metaMaskWallet, rainbowWallet } from "@rainbow-me/rainbowkit/wallets";
import scaffoldConfig from "~~/scaffold.config";

const wallets = [metaMaskWallet, ledgerWallet, coinbaseWallet, rainbowWallet];

/**
 * wagmi connectors for the wagmi context
 */
export const wagmiConnectors = connectorsForWallets(
  [
    {
      groupName: "Supported Wallets",
      wallets,
    },
  ],

  {
    appName: "scaffold-eth-2",
    projectId: scaffoldConfig.walletConnectProjectId,
  },
);

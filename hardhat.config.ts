import { HardhatUserConfig, task, vars } from "hardhat/config";
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import "@nomicfoundation/hardhat-toolbox-viem";

const INFURA_API_KEY = vars.get("INFURA_API_KEY");
const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY");
const WALLET_PRIVATE_KEY = vars.get("WALLET_PRIVATE_KEY");

type WalletClientsTaskArgs = {
  message: string;
};

task("wallet-clients", "Prints the list of accounts")
  .addParam("message", "A message to log")
  .setAction(async (taskArgs: WalletClientsTaskArgs, hre: HardhatRuntimeEnvironment) => {

    const accounts = await hre.viem.getWalletClients();
    for (const account of accounts) {
      console.log(account.account.address);
    }
    console.log(taskArgs.message)
  });

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [WALLET_PRIVATE_KEY],
    },
  },
  sourcify: {
    enabled: true
  },
};

export default config;

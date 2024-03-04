import dotenv from 'dotenv';
dotenv.config();
import { HardhatUserConfig, task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import "@nomicfoundation/hardhat-toolbox-viem";

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
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.WALLET_PRIVATE_KEY],
    },
  },
  sourcify: {
    enabled: true
  },
};

export default config;

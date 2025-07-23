require("@nomicfoundation/hardhat-toolbox");
const { vars } = require("hardhat/config");

module.exports = {
  solidity: "0.8.28",
  defaultNetwork: "alfajores",

  networks: {
    
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: vars.has("PRIVATE_KEY") ? [vars.get("PRIVATE_KEY")] : [],
      chainId: 44787,
      gasPrice: 1000000000,
    },
  },

  etherscan: {
    apiKey: vars.get("ETHERSCAN_API_KEY"),
    customChains: [
      {
       
        network: "alfajores",
        urls: {
          apiURL: "https://explorer.celo.org/alfajores/api",
          browserURL: "https://explorer.celo.org/alfajores",
        },
      },
    ],
  },
};
    
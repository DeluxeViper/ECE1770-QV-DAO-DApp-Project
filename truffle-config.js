// require('babel-register')
// require('babel-polyfill')
require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider')
const {PRIVATE_KEY} = process.env;
module.exports = {
  // Configure networks (Localhost, Rinkeby, etc.)
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*', // Match any network id
    },
    sepolia:{
      provider: () => {
        return new HDWalletProvider(
          PRIVATE_KEY, "https://sepolia.infura.io/v3/4eda45fd36c44830b01bf165cd4c00e5");
      },
        network_id: "11155111",
        confirmations: 1,
        timeoutBlocks: 200,
        skipDryRun: true
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  // Configure your compilers
  compilers: {
    solc: {
      version: '0.8.11',
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
}

# Celo Storage Contract Deployment

This project demonstrates deploying and verifying a Storage smart contract on Celo Alfajores Testnet using both Hardhat and Foundry.

## Project Structure

```
├── hardhat/          # Hardhat project folder
├── foundry/          # Foundry project folder
└── README.md         # This file
```

## Storage Contract

A simple smart contract that allows you to:
- Store a uint256 value
- Retrieve the stored value

## Prerequisites

1. Node.js and npm installed
2. Foundry installed ([Installation Guide](https://book.getfoundry.sh/getting-started/installation))
3. Celo wallet with CELO tokens for Alfajores testnet
4. Get testnet CELO from [Celo Faucet](https://faucet.celo.org/)

## Setup

### Hardhat Setup
```bash
cd hardhat
npm install
npx hardhat vars set PRIVATE_KEY
npx hardhat vars set ETHERSCAN_API_KEY
```

### Foundry Setup
```bash
cd foundry
forge init --force .
cp .env.example .env
# Edit .env with your private key and API key
cp ../hardhat/contracts/Storage.sol src/
```

## Deployment Commands

### Hardhat Deployment
```bash
cd hardhat
npx hardhat ignition deploy ./ignition/modules/Storage.js --network alfajores
npx hardhat verify --network alfajores <CONTRACT_ADDRESS>
```

### Foundry Deployment
```bash
cd foundry
forge script script/DeployStorage.s.sol:DeployStorage --rpc-url alfajores --broadcast --verify
```

## 🚀 Deployed Contract Addresses

### Hardhat Deployment
- **Contract Address**: `0x13103aE089Ae8c0C60837B1BFD0102EF4070F295`
- **Explorer**: [View on Celoscan](https://alfajores.celoscan.io/address/0x13103aE089Ae8c0C60837B1BFD0102EF4070F295)

### Foundry Deployment  
- **Contract Address**: `0xd5e9903457ea307E3a1db819Df42570E767d4Ec5`
- **Explorer**: [View on Celoscan](https://alfajores.celoscan.io/address/0xd5e9903457ea307E3a1db819Df42570E767d4Ec5#code)

## Testing the Contracts

### Using Hardhat Console
```bash
cd hardhat
npx hardhat console --network alfajores

# In console:
const Storage = await ethers.getContractFactory("Storage");
const storage = Storage.attach("0x13103aE089Ae8c0C60837B1BFD0102EF4070F295");
await storage.store(123);
await storage.retrieve(); // Returns 123
```

### Using Foundry Cast
```bash
# Read current value
cast call 0xd5e9903457ea307E3a1db819Df42570E767d4Ec5 "retrieve()" --rpc-url alfajores

# Store a new value
cast send 0xd5e9903457ea307E3a1db819Df42570E767d4Ec5 "store(uint256)" 456 --rpc-url alfajores --private-key $PRIVATE_KEY
```

## Network Information

- **Network**: Celo Alfajores Testnet
- **Chain ID**: 44787
- **RPC URL**: https://alfajores-forno.celo-testnet.org
- **Explorer**: https://alfajores.celoscan.io/
- **Faucet**: https://faucet.celo.org/

## Key Learnings

### Issues Resolved
1. **Hardhat Verification**: Added `chainId: 44787` to etherscan customChains
2. **Foundry Reserved Keywords**: Renamed `storage` variable to `storageContract`
3. **Private Key Format**: Handled both "0x" prefixed and non-prefixed private keys

## Resources

- [Celo Documentation](https://docs.celo.org/)
- [Hardhat Documentation](https://hardhat.org/docs)
- [Foundry Documentation](https://book.getfoundry.sh/)
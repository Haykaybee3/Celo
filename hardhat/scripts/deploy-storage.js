const hre = require("hardhat");

async function main() {
  console.log("Deploying Storage contract to Celo Alfajores...");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "CELO");

  const Storage = await hre.ethers.getContractFactory("Storage");
  const storage = await Storage.deploy();

  await storage.waitForDeployment();
  const contractAddress = await storage.getAddress();

  console.log("Storage contract deployed to:", contractAddress);

  await storage.deploymentTransaction().wait(5);

  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: [],
    });
    console.log("Contract verified successfully!");
  } catch (error) {
    console.log("Verification failed:", error.message);
  }

  await storage.store(42);
  const retrievedValue = await storage.retrieve();
  console.log("Test: stored 42, retrieved:", retrievedValue.toString());

  console.log("\nContract Address:", contractAddress);
  console.log("Explorer:", `https://explorer.celo.org/alfajores/address/${contractAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 
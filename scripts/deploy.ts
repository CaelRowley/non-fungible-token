import fs from "fs";
import hre from "hardhat";

async function main() {
	const [owner] = await hre.viem.getWalletClients();

	const contract = await hre.viem.deployContract("GhostiesNFT", [
		owner.account.address,
	]);

	console.log(
		`Ghosties contract with owner: ${owner.account.address} deployed to: ${contract.address}`,
	);

	const deploymentInfo = {
		address: contract.address,
		abi: contract.abi,
	};

	const filePath = "contracts/deployments";
	fs.mkdirSync(filePath, { recursive: true });
	fs.writeFileSync(
		`${filePath}/deployed.json`,
		JSON.stringify(deploymentInfo, null, 2),
	);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});

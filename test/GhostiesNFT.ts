import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { getAddress } from "viem";

describe("GhostiesNFT", () => {
	async function deployContract() {
		const [owner] = await hre.viem.getWalletClients();

		const contract = await hre.viem.deployContract("GhostiesNFT", [
			owner.account.address,
		]);

		return {
			owner,
			contract,
		};
	}

	describe("Deployment", () => {
		it("Should set the right name", async () => {
			const { contract } = await loadFixture(deployContract);

			expect(await contract.read.name()).to.equal("Ghosties");
		});

		it("Should set the right name", async () => {
			const { contract } = await loadFixture(deployContract);

			expect(await contract.read.symbol()).to.equal("G");
		});

		it("Should set the right owner", async () => {
			const { contract, owner } = await loadFixture(deployContract);

			expect(await contract.read.owner()).to.equal(
				getAddress(owner.account.address),
			);
		});
	});
});

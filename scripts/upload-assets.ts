import fs from "fs";
import pinataSDK from "@pinata/sdk";
import { parse } from "csv-parse";
import { vars } from "hardhat/config";

const PINATA_API_KEY = vars.get("PINATA_API_KEY");
const PINATA_API_SECRET = vars.get("PINATA_API_SECRET");
const PINATA_GATEWAY = vars.get("PINATA_GATEWAY");

const GHOSTIES_METADATA = "assets/ghosties_metadata.csv";
const GHOSTIES_PICS_PATH = "assets/pics/";

function createAttributes(
	rarity: string,
	type: string,
	attack: string,
): string[] {
	const rarity_attribute = JSON.parse(
		`{ "trait_type": "Rarity", "value": "${rarity}" }`,
	);
	const type_attribute = JSON.parse(
		`{ "trait_type": "Type", "value": "${type}" }`,
	);
	const attack_attribute = JSON.parse(
		`{ "trait_type": "Type", "value": "${attack}" }`,
	);

	return [rarity_attribute, type_attribute, attack_attribute];
}

async function storePics(pinata: pinataSDK): Promise<string> {
	return pinata
		.pinFromFS(GHOSTIES_PICS_PATH, {})
		.then((result) => {
			console.log(result);
			return result.IpfsHash;
		})
		.catch((err) => {
			console.log(err);
			return "";
		});
}

async function uploadAsset(
	pinata: pinataSDK,
	name: string,
	description: string,
	attributes: string[],
	image: string,
) {
	// https://docs.opensea.io/docs/metadata-standards
	const body = {
		name,
		description,
		image,
		attributes,
	};

	const options = {
		pinataMetadata: {
			name,
			keyvalues: {
				contract: "GhostiesNFT",
			},
		},
	};

	pinata
		.pinJSONToIPFS(body, options as any)
		.then((result) => {
			console.log(result);
		})
		.catch((err) => {
			console.log(err);
		});
}

async function main() {
	const pinata = new pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);

	await pinata
		.testAuthentication()
		.then((result) => {
			console.log(result);
		})
		.catch((err) => {
			console.log(err);
			return;
		});

	const picsHash = await storePics(pinata);

	const parser = parse({ columns: true }, async (err, records) => {
		for (let i = 0; i < records.length; i++) {
			const record = records[i];

			const id = record.ID;
			const name = record.Name;
			const rarity = record.Rarity;
			const type = record.Type;
			const attack = record.Attack;
			const description = record.Description;
			const image = `https://${PINATA_GATEWAY}/ipfs/${picsHash}/${id}.png`;

			const attributes = createAttributes(rarity, type, attack);

			await uploadAsset(pinata, name, description, attributes, image);
		}
	});

	fs.createReadStream(GHOSTIES_METADATA).pipe(parser);
}

main();

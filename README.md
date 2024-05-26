# Ethereum Smart Contract Project

A small project to create NFTs using the [ERC-721](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/) standard with the latest versions of [Solidity](https://soliditylang.org/), [Hardhat](https://hardhat.org/), [viem](https://viem.sh/docs/getting-started.html), [Remix](https://remix.ethereum.org) and other relevant tools in the Ethereum ecosystem.

The metadata for the NFTs is stored on [Pinata](https://app.pinata.cloud). The metadata follows the [metadata standards](https://docs.opensea.io/docs/metadata-standards) so that it can be viewed on [OpenSea](https://opensea.io/).

## Environment Variables

- **PINATA_API_KEY** <i>The api key to call Pinata's api.</i>
- **PINATA_API_SECRET** <i>The api key secret for Pinata's api.</i>
- **PINATA_GATEWAY** <i>The URLs through which you can fetch content from IPFS.</i>


## License

This project is licensed under the [ISC License](https://www.isc.org/licenses/), which allows for free use, modification, and distribution of the code. Refer to the LICENSE file for more details.

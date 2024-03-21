// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract MyToken is ERC1155, ERC1155Burnable, AccessControl, ERC1155Supply {
    string private _name;

    bytes32 public constant CUSTODIAN = keccak256("CUSTODIAN");
    bytes32 public constant ADMIN = keccak256("ADMIN");
    bytes32 public constant INVESTOR = keccak256("INVESTOR");

    constructor(string memory name, address admin) ERC1155("") {
        _name = name;
        _grantRole(ADMIN, admin);
    }

    modifier isInvestor(address to) {
        require(
            super.hasRole(INVESTOR, to),
            "INVESTOR role missing"
        );
        _;
    }

    function mint(address to, uint256 id, uint256 amount, bytes memory data)
        public
        onlyRole(CUSTODIAN)
        isInvestor(to)
    {
        _mint(to, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyRole(CUSTODIAN)
        isInvestor(to)
    {
        _mintBatch(to, ids, amounts, data);
    }

    // The following functions are overrides required by Solidity.
    function _update(address from, address to, uint256[] memory ids, uint256[] memory values)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._update(from, to, ids, values);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Author: @CaelRowley
contract Lock {
    string public name;
    string public symbol;

    uint public unlockTime;
    address payable public owner;

    event Withdrawal(uint amount, uint when);

    constructor(
        string memory _name,
        string memory _symbol,
        uint _unlockTime
    ) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        name = _name;
        symbol = _symbol;

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}

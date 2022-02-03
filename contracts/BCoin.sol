pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BCoin is ERC20 {
    address private _owner;

    constructor() ERC20("Beaver Coin", "bcoin") {
        _owner = msg.sender;
    }

    function mint() external payable {
        uint256 newTokensAmount = msg.value; // Ratio

        _mint(msg.sender, newTokensAmount);
    }
}

pragma solidity ^0.8.10;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BCoin is ERC20 {
    address private _owner;

    constructor() ERC20("Beaver Coin", "bcoin") {
        _owner = msg.sender;
    }

    function mint(uint256 amount) external {
        require(_owner == msg.sender, "Only for me to call");

        _mint(msg.sender, amount);
    }
}
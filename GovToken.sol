// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GovToken is ERC20, Ownable {
    constructor() ERC20("Governance Token", "GT") {
        // Mint 1 Million tokens to the deployer for distribution
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    // Function to faucet tokens for testing purposes
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}

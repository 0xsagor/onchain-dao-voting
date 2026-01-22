// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DAO {
    struct Proposal {
        uint256 id;
        string description;
        uint256 voteCount;
        bool executed;
        address creator;
    }

    IERC20 public govToken;
    uint256 public proposalCount;
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    event ProposalCreated(uint256 id, string description, address creator);
    event Voted(uint256 id, address voter, uint256 weight);

    constructor(address _tokenAddress) {
        govToken = IERC20(_tokenAddress);
    }

    function createProposal(string memory _desc) external {
        proposalCount++;
        proposals[proposalCount] = Proposal(proposalCount, _desc, 0, false, msg.sender);
        emit ProposalCreated(proposalCount, _desc, msg.sender);
    }

    function vote(uint256 _proposalId) external {
        Proposal storage p = proposals[_proposalId];
        require(!hasVoted[_proposalId][msg.sender], "Already voted");
        require(!p.executed, "Already executed");

        uint256 balance = govToken.balanceOf(msg.sender);
        require(balance > 0, "No voting power");

        hasVoted[_proposalId][msg.sender] = true;
        p.voteCount += balance;

        emit Voted(_proposalId, msg.sender, balance);
    }

    function getProposal(uint256 _id) external view returns (Proposal memory) {
        return proposals[_id];
    }
}

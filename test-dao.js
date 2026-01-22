const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DAO", function () {
  it("Should create proposal and vote", async function () {
    const [owner, voter] = await ethers.getSigners();
    
    // Deploy Token
    const Token = await ethers.getContractFactory("GovToken");
    const token = await Token.deploy();
    await token.transfer(voter.address, ethers.utils.parseEther("10"));

    // Deploy DAO
    const DAO = await ethers.getContractFactory("DAO");
    const dao = await DAO.deploy(token.address);

    // Create Proposal
    await dao.createProposal("Build a bridge");
    
    // Vote
    await dao.connect(voter).vote(1);
    
    const proposal = await dao.getProposal(1);
    expect(proposal.voteCount).to.equal(ethers.utils.parseEther("10"));
  });
});

const daoAddress = "0xYOUR_DAO_ADDRESS";
const daoABI = [
    "function createProposal(string memory _desc) external",
    "function vote(uint256 _proposalId) external",
    "function proposalCount() view returns (uint256)",
    "function getProposal(uint256 _id) view returns (tuple(uint256 id, string description, uint256 voteCount, bool executed, address creator))"
];

let provider, signer, contract;

document.getElementById('connectBtn').addEventListener('click', async () => {
    if(window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        contract = new ethers.Contract(daoAddress, daoABI, signer);
        document.getElementById('connectBtn').innerText = "Connected";
        loadProposals();
    }
});

document.getElementById('createBtn').addEventListener('click', async () => {
    const desc = document.getElementById('descInput').value;
    const tx = await contract.createProposal(desc);
    await tx.wait();
    loadProposals();
});

async function loadProposals() {
    const list = document.getElementById('proposalList');
    list.innerHTML = "Loading...";
    const count = await contract.proposalCount();
    list.innerHTML = "";

    for(let i = 1; i <= count; i++) {
        const p = await contract.getProposal(i);
        const div = document.createElement('div');
        div.className = 'proposal-card';
        div.innerHTML = `
            <div>
                <h3>Proposal #${p.id}</h3>
                <p>${p.description}</p>
                <span class="vote-info">Votes: ${ethers.utils.formatEther(p.voteCount)} GT</span>
            </div>
            <button onclick="vote(${p.id})">Vote</button>
        `;
        list.appendChild(div);
    }
}

async function vote(id) {
    try {
        const tx = await contract.vote(id);
        await tx.wait();
        alert("Voted successfully!");
        loadProposals();
    } catch(err) {
        console.error(err);
        alert("Vote failed (Do you hold tokens?)");
    }
}

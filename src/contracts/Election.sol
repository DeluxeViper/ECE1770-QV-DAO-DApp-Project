// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Election is ReentrancyGuard, AccessControl {
    uint32 immutable MIN_VOTE_DURATION = 5 minutes;
    uint256 immutable MAX_TOKENS = 10;
    uint256 totalProposals;

    struct Candidate {
        uint256 id;
        string name;
        uint256 votes;
    }

    struct Proposal {
        uint256 id;
        uint256 duration;
        string title;
        string description;
        bool ended;
        address proposer;
        address executor; // ??
        Candidate[] candidates;
    }

    // Vote object to keep track of votes in a proposal
    struct Vote {
        address voter;
        uint256 candidateId;
        uint256 timestamp;
        uint256 numVotes;
    }

    mapping(uint256 => Proposal) private raisedProposals;
    mapping(address => Vote) private votes; // Keep track of Vote per address

    // Keep track of tokens spent per address for each proposdal
    mapping(address => mapping(uint256 => uint256)) private tokensSpent;

    // All vote objects for a proposal
    mapping(uint256 => Vote[]) private votedOn;

    // ??
    // mapping(address => uint256) private contributors;
    // mapping(address => uint256) private stakeholders;

    event Action(address indexed initiator, string message);

    function createProposal(
        string calldata title,
        string calldata description,
        string[] memory _candidateNames
    ) external returns (Proposal memory) {
        uint256 proposalId = totalProposals++;
        Proposal storage proposal = raisedProposals[proposalId];
        proposal.id = proposalId;
        proposal.title = title;
        proposal.description = description;
        proposal.proposer = payable(msg.sender);

        // TODO: Make this variable
        proposal.duration = block.timestamp + MIN_VOTE_DURATION;

        // Init candidates
        for (uint256 i = 0; i < _candidateNames.length; i++) {
            proposal.candidates.push(Candidate(i, _candidateNames[i], 0));
        }

        emit Action(msg.sender, "PROPOSAL_RAISED");

        return proposal;
    }

    function getProposals() external view returns (Proposal[] memory props) {
        props = new Proposal[](totalProposals);

        for (uint256 i = 0; i < totalProposals; i++) {
            props[i] = raisedProposals[i];
        }
    }

    function getProposal(
        uint256 proposalId
    ) external view returns (Proposal memory) {
        return raisedProposals[proposalId];
    }

    // Might be redundant in client code
    function getCandidates(
        uint256 proposalId
    ) public view returns (Candidate[] memory) {
        return raisedProposals[proposalId].candidates;
    }

    function getTokensLeftForProposal(
        uint256 proposalId
    ) public view returns (uint256) {
        return MAX_TOKENS - tokensSpent[msg.sender][proposalId];
    }

    function voteForCandidate(
        uint256 proposalId,
        uint256 candidateId,
        uint256 numVotes
    ) public returns (Candidate memory) {
        Proposal storage proposal = raisedProposals[proposalId];
        Candidate[] memory candidates = proposal.candidates;

        if (proposal.ended || proposal.duration <= block.timestamp) {
            proposal.ended = true;
            revert("Proposal duration expired");
        }

        // Check if msg.sender has enough tokens
        // TODO: Implement quadratic voiting here
        uint256 totalNumTokensSpent = tokensSpent[msg.sender][proposalId] +
            numVotes *
            1;
        if (totalNumTokensSpent >= MAX_TOKENS) {
            revert("Insufficient tokens for address.");
        }

        // Add vote to candidate
        proposal.candidates[candidateId].votes += numVotes; // TODO: Implement time decay here

        // proposal.candidates = candidates; // Updated candidates

        // Add vote to Address -> Vote map
        // votes[msg.sender] = Vote(msg.sender, proposalId, candidateId, block.timestamp);
        votedOn[proposalId].push(
            Vote(msg.sender, candidateId, block.timestamp, numVotes)
        );

        emit Action(msg.sender, "PROPOSAL_VOTE");

        // TODO: Should candidate be returned here or vote?
        return candidates[candidateId];
    }

    function getVotesOfProposal(
        uint256 proposalId
    ) public view returns (Vote[] memory) {
        return votedOn[proposalId];
    }
}

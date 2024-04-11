// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./QuadraDAO.sol";
import "hardhat/console.sol";

contract Election is AccessControl {
    // bytes32 public immutable STAKEHOLDER_ROLE = keccak256("STAKEHOLDER");
    bytes32 public immutable ADMIN_ROLE = keccak256("ADMIN");
    uint32 immutable MIN_VOTE_DURATION = 1000;
    uint32 immutable MIN_APPROVAL_VOTES = 1;
    uint32 immutable MIN_APPROVAL_RATES = 25;
    uint256 immutable MIN_VOTER_TOKENS = 10;
    address private immutable _token;

    enum ProposalStatus {
        IN_PROGRESS,
        APPROVED,
        REJECTED,
        ENDED
    }

    enum VoteStatus {
        UPVOTE,
        DOWNVOTE,
        ABSTAIN
    }

    struct Proposal {
        uint256 id;
        string title;
        uint256 upvotes;
        uint256 downvotes;
        uint256 abstains;
        string description;
        ProposalStatus status;
        address proposer;
        address executor;
    }

    struct Voter {
        uint256 tokens;
        bool valid;
        uint256 weight;
    }

    // struct Stage {
    //     uint256 start;
    //     uint256 duration;
    //     Proposal[] proposals;
    // }

    //Store Proposals
    mapping(uint256 => Proposal) public proposals;

    //store accounts that have voted and how many votes they have cast
    mapping(address => Voter) public voters;

    mapping(address => mapping(uint256 => uint256)) public votedOn;

    //Store Proposal Count
    uint256 public proposalsCount;

    event NewProposal(uint256 id, string title);

    constructor(address admin,address token) {
        _token = token;
        _grantRole(ADMIN_ROLE, admin);
        console.log("Creating a new proposal");
        // create   a new proposal
    }

    function getNFTAddress() public view returns (address) {
        return _token;
    }

    function _isStakeholder(address _voter) public view returns (bool) {
        // if the voter has a token in the Token contract
        // cast the function BalanceOf to the token contract QUadraDAO with address _token
        QuadraDAO token = QuadraDAO(_token);
        if(token.balanceOf(_voter) > 0) return true;
        return false;
    }

    function resetVotingPower(address _voter) public onlyRole(ADMIN_ROLE) {
        voters[_voter].tokens = MIN_VOTER_TOKENS; 
    }

    function createProposal(string memory _title, string memory _description) 
        public
    {
        //require a valid duration
        require(bytes(_title).length > 0, "Title must be valid");
        require(bytes(_description).length > 0, "Description must be valid");
        //require a valid voter or a admin
        // // check if the msg sender is admin
        if (hasRole(ADMIN_ROLE, msg.sender) || msg.sender == _token || msg.sender == address(this)) {
            // console.log("Admin is creating a proposal");
        } else {
            // console.log("Voter is creating a proposal");
            require(_isStakeholder(msg.sender), "Voter must be a stakeholder");
        }
        proposalsCount++;
        proposals[proposalsCount] = Proposal({
            id: proposalsCount,
            title: _title,
            upvotes: 0,
            downvotes: 0,
            abstains: 0,
            description: _description,
            status: ProposalStatus.IN_PROGRESS,
            proposer: msg.sender,
            executor: address(0)
        });
    }

    function getProposals() public view returns (Proposal[] memory) {
        // return all candidates
        Proposal[] memory result = new Proposal[](proposalsCount);
        for (uint i = 1; i <= proposalsCount; i++) {
            result[i-1] = proposals[i];
        }
        return result;
    }

    function addVoter(address _voter) private{
        if (voters[_voter].valid == true) return;
        voters[_voter].valid = true;
        voters[_voter].tokens = MIN_VOTER_TOKENS;
        voters[_voter].weight = 1;
    }

    function getVoterStatus(address _voter) public returns (Voter memory) {
        // _isStakeholder(msg.sender);
        if (!voters[_voter].valid) {
            addVoter(_voter);
        }
        // return voter status
        return voters[_voter];
    }

    function quadraticVote(uint256 voted, uint256 new_votes) public pure returns (uint) {
        uint256 tokens = 0;
        for (uint i = 1; i <= new_votes; i++) {
            tokens += (voted + i) * (voted + i);
        }
        return tokens;
    }

    function vote(uint256 _proposalId, uint256 _votes, VoteStatus _choose) public {
        //TODO: check voter eligibility
        // _isStakeholder(msg.sender);

        //initialize voter if not already initialized
        if(!voters[msg.sender].valid){
            addVoter(msg.sender);
        }

        //require a valid proposal
        require(_proposalId > 0 && _proposalId <= proposalsCount, "Proposal must be valid");

        require(_votes > 0, "Votes must be positive");
        uint256 voted = votedOn[msg.sender][_proposalId];
        uint256 token_required = quadraticVote(voted, _votes);
        
        //print(token_required);
        //require have enough tokens to vote
        require(voters[msg.sender].tokens >= token_required, "Not enough tokens to vote");

        //record that voter has voted
        voters[msg.sender].tokens -= token_required;
        votedOn[msg.sender][_proposalId] += _votes;

        //update candidate vote Count
        if (_choose == VoteStatus.UPVOTE) {
            proposals[_proposalId].upvotes += _votes;
        } else if (_choose == VoteStatus.DOWNVOTE) {
            proposals[_proposalId].downvotes += _votes;
        } else {
            proposals[_proposalId].abstains += _votes;
        }
    }

    function getProposal(uint256 _proposalId) public view returns (Proposal memory) {
        //require a valid proposal
        require(_proposalId > 0 && _proposalId <= proposalsCount, "Proposal must be valid");
        // return the proposal
        return proposals[_proposalId];
    }

}

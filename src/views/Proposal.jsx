import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import ProposalDetails from '../components/ProposalDetails'
import CandidatesList from '../components/CandidatesList';
import Voters from '../components/Voters'
import { getProposal } from '../Blockchain.services'

const Proposal = () => {
  const { id } = useParams()
  const [proposal, setProposal] = useState(null);
  const [data, setData] = useState([])
  
  useEffect(() => {
    retrieveProposal()
  }, [id])

  useEffect(() => {
    console.log("proposal")
    console.log(proposal)
  }, [proposal])

  const retrieveProposal = async () => {
    console.log("id: " + id);
    await getProposal(id).then((res) => {
      console.log("retrieveProposal: ");
      console.log(res);
      setProposal(res)

      // X-axis: Candidates
      // Y-axis: Magnitude of votes

      if (res && res.candidates) {
        const candidateVotes = res.candidates.map((candidate) => 
          [candidate.name, candidate.votes]
        )
        setData([{candidateVotes}])

      }
    })
  }

  return (
    <>
      <ProposalDetails proposal={proposal} data={data} />
      <CandidatesList proposal={proposal} />
      <Voters />
    </>
  )
}

export default Proposal


import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import ProposalDetails from '../components/ProposalDetails'
import CandidatesList from '../components/CandidatesList';
import Voters from '../components/Voters'
import { getProposal, listVoters } from '../Blockchain.services'

const Proposal = () => {
  const { id } = useParams()
  const [proposal, setProposal] = useState(null);
  const [data, setData] = useState([])
  const [voters, setVoters] = useState([])

  
  useEffect(async () => {
    await retrieveProposal()
    await listVoters(id).then((res) => {
      setVoters(res)
    })
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
        setData([{ candidateVotes, voters }])

      }
    })
  }

  return (
    <>
      <ProposalDetails proposal={proposal} data={data} voters={voters} />
      <CandidatesList proposal={proposal} />
      <Voters voters={voters} />
    </>
  )
}

export default Proposal


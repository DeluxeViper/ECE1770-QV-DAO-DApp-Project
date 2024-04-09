import { useState, useEffect } from 'react';
import Identicon from 'react-identicons'
import { toast } from 'react-toastify'
import { getProposal, voteOnProposal } from '../Blockchain.services'

const CandidatesList = ({ proposal }) => {
  const [candidates, setCandidates] = useState([])
  const [votes, setVotes] = useState({})

  useEffect(() => {
    getAllCandidates()
  }, [proposal]);

  const getAllCandidates = () => {
    if (proposal && proposal?.candidates) {
      const candidateVotes = {}
      setCandidates(proposal.candidates)
      proposal.candidates.forEach((candidate) => {
        candidateVotes[candidate.id] = 0 
      })
      setVotes(candidateVotes)
      console.log("candidateVotes");
      console.log(candidateVotes)
    }
  }

  const onSubmitVote = async (candidateId) => {
    if (new Date().getTime() > Number(proposal.duration + '000')) {
      const timePassedEndOfDuration = (new Date().getTime() - Number(proposal.duration + '000'))/1000;
      toast.warning('Proposal expired ' + timePassedEndOfDuration + ' seconds ago.')
      return
    }

    await voteOnProposal(proposal.id, candidateId, votes[candidateId])
    toast.success('Voted successfully!')
  }

  return (
    <div className="mt-4 text-center">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="h-[calc(100vh_-_20rem)] overflow-y-auto  shadow-md rounded-md">
            <table className="min-w-full">
              <thead className="border-b dark:border-gray-500">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium px-6 py-4 text-left"
                  >
                    Candidate Name
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium px-6 py-4 text-left"
                  >
                    Number of Votes
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium px-6 py-4 text-left"
                  >
                    Vote
                  </th>
                </tr>
              </thead>
              <tbody>
                {candidates && candidates.length && candidates.map((candidate, i) => (
                  <tr
                    key={i}
                    className="border-b dark:border-gray-500 transition duration-300 ease-in-out"
                  >
                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-row justify-start items-center space-x-3">
                        <Identicon
                          string={candidate.name.toLowerCase()}
                          size={25}
                          className="h-10 w-10 object-contain rounded-full mr-3"
                        />
                        <span>{candidate.name.toLowerCase()}</span>
                      </div>
                    </td>
                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-row justify-start items-center space-x-3">
                        <span>{candidate.votes}</span>
                      </div>
                    </td>
                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                      <div className="flex">
                      <input
                        type="number"
                        className="form-control block px-3 py-1.5 mr-5
          text-base font-normaltext-gray-700
          bg-clip-padding border border-solid border-gray-300
          rounded transition ease-in-out m-0 shadow-md
          focus:text-gray-500 focus:outline-none
          dark:border-gray-500 dark:bg-transparent"
                        placeholder="e.g 2.5 Eth"
                        value={votes && i in votes ? votes[i] : 0}
                        onChange={(e) => {
                          const newVotes = {
                            ...votes,
                          }
                          newVotes[i] = e.target.value;
                          setVotes(newVotes)
                        }}
                        required
                      />
                      <button
                        className="border-2 rounded-full px-6 py-2.5 border-blue-600
                          text-blue-600 font-medium text-xs leading-tight
                          uppercase hover:border-blue-700 focus:border-blue-700
                          focus:outline-none focus:ring-0 active:border-blue-800
                          transition duration-150 ease-in-out"
                        onClick={() => onSubmitVote(i)}
                      >
                        Vote
                      </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidatesList;

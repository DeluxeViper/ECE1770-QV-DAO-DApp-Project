import Identicon from 'react-identicons'
import moment from 'moment'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { truncate } from '../store'
import { listVoters } from '../Blockchain.services'

const Voters = () => {
  const [voters, setVoters] = useState([])
  const { id } = useParams()

  const timeAgo = (timestamp) => moment(Number(timestamp + '000')).fromNow()

  const active = `bg-blue-600
  text-white font-medium text-xs leading-tight
  uppercase hover:bg-blue-700 focus:bg-blue-700
  focus:outline-none focus:ring-0 active:bg-blue-800
  transition duration-150 ease-in-out overflow-hidden
  border border-blue-600`

  useEffect(async () => {
    await listVoters(id).then((res) => {
      setVoters(res)
    })
  }, [id])

  const getAll = () => setVoters(data)

  return (
    <div className="flex flex-col p-8">
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
                    Voter
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium px-6 py-4 text-left"
                  >
                    Voted
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium px-6 py-4 text-left"
                  >
                    Number of votes
                  </th>
                </tr>
              </thead>
              <tbody>
                {voters.map((voter, i) => (
                  <tr
                    key={i}
                    className="border-b dark:border-gray-500 transition duration-300 ease-in-out"
                  >
                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-row justify-start items-center space-x-3">
                        <Identicon
                          string={voter.voter.toLowerCase()}
                          size={25}
                          className="h-10 w-10 object-contain rounded-full mr-3"
                        />
                        <span>{truncate(voter.voter, 4, 4, 11)}</span>
                      </div>
                    </td>
                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                      {timeAgo(voter.timestamp)}
                    </td>
                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                      {voter.numVotes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        {voters.length >= 10 ? (
          <button
            aria-current="page"
            className="rounded-full px-6 py-2.5 bg-blue-600
            font-medium text-xs leading-tight
            uppercase hover:bg-blue-700 focus:bg-blue-700
            focus:outline-none focus:ring-0 active:bg-blue-800
            transition duration-150 ease-in-out dark:text-gray-300
            dark:border dark:border-gray-500 dark:bg-transparent"
          >
            Load More
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default Voters


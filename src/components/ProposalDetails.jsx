import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from 'recharts'
import { daysRemaining } from '../store'

const ProposalDetails = ({ proposal, data }) => {

  const getColorForNumber = (number) => {
    const colorMap = {
        0: "#46b890", // Turquoise
        1: "#ff0000",  // Red
        2: "#00ff00",  // Green
        3: "#0000ff",  // Blue
        4: "#f0f0f0",  // White
        5: "#0f0f0f",  
        6: "#828333",  // yellow
        7: "#4f119a",
        // Define colors for numbers up to 100 as needed
    };

    // Return color for the given number, defaulting to black for numbers not defined
    return colorMap[number]|| "#000000"; // Default to black if color is not defined
}

  return (
    <div className="p-8">
      <h2 className="font-semibold text-3xl mb-5">{proposal?.title}</h2>
      <p>
        This proposal is to payout <strong>{proposal?.amount} Eth</strong> and
        currently have{' '}
        <strong>{proposal?.upvotes + proposal?.downvotes} votes</strong> and
        will expire in <strong>{daysRemaining(proposal?.duration)}</strong>
      </p>
      <hr className="my-6 border-gray-300" />
      <p>{proposal?.description}</p>
      <div className="flex flex-row justify-start items-center w-full mt-4 overflow-auto">
        <BarChart key={data} width={730} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {data && data[0]?.candidateVotes?.map((candidateObjArr, i) => {
            return <Bar dataKey={`candidateVotes[${i}][1]`} name={candidateObjArr[0]} fill={getColorForNumber(i)} />
          })}
        </BarChart>
      </div>
    </div>
  )
}

export default ProposalDetails


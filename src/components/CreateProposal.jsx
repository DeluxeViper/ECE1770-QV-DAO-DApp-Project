import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { setGlobalState, useGlobalState } from '../store'
import { raiseProposal } from '../Blockchain.services'
import { toast } from 'react-toastify'

const CreateProposal = () => {
  const [createModal] = useGlobalState('createModal')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [candidateNames, setCandidateNames] = useState()
  const [tokensPerAddress, setTokensPerAddress] = useState()
  const [qvEnabled, setQvEnabled] = useState(false)
  const [timeDecayEnabled, setTimeDecayEnabled] = useState(false)
  const [timeLength, setTimeLength] = useState(300);

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !description) return

    // Parse candidate names into list of str
    const candidateNamesArr = candidateNames.split(",");
    console.log("List of candidate split names: " + candidateNamesArr);

    const proposal = {
      title,
      description,
      candidateNames,
      maxTokensPerAddress: tokensPerAddress,
      qvEnabled,
      linearTimeDecayEnabled: timeDecayEnabled,
      timeLength,
    }

    await raiseProposal(proposal)
    toast.success('Proposal created, reloading in progress...')
    closeModal()
  }

  const closeModal = () => {
    setGlobalState('createModal', 'scale-0')
    resetForm()
  }

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setCandidateNames('')
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center
      justify-center bg-black bg-opacity-50 transform z-50
      transition-transform duration-300 ${createModal}`}
    >
      <div className="bg-white dark:bg-[#212936] shadow-xl shadow-[#122643] dark:shadow-gray-500 rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold">Raise Proposal</p>
            <button
              type="button"
              onClick={closeModal}
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex flex-row justify-between items-center border border-gray-500 dark:border-gray-500 rounded-xl mt-5">
            <input
              className="block w-full text-sm
              bg-transparent border-0
              focus:outline-none focus:ring-0"
              type="text"
              name="title"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </div>


          <div className="flex flex-row justify-between items-center border border-gray-500 dark:border-gray-500 rounded-xl mt-5">
            <input
              className="block w-full text-sm
              bg-transparent border-0
              focus:outline-none focus:ring-0"
              type="number"
              name="Max Tokens per Address"
              placeholder="Enter max tokens per address"
              onChange={(e) => setTokensPerAddress(e.target.value)}
              value={tokensPerAddress}
              required
            />
          </div>

          <div className="flex flex-row justify-between items-center border border-gray-500 dark:border-gray-500 rounded-xl mt-5">
            <input
              className="block w-full text-sm
              bg-transparent border-0
              focus:outline-none focus:ring-0"
              type="text"
              name="Candidate names"
              placeholder="Candidate Names"
              onChange={(e) =>
                setCandidateNames(e.target.value)
              }
              value={candidateNames}
              required
            />
          </div>

          <div className="flex flex-row justify-between items-center border border-gray-500 dark:border-gray-500 rounded-xl mt-5">
            <input
              className="block w-full text-sm
              bg-transparent border-0
              focus:outline-none focus:ring-0"
              type="number"
              name="Time length of proposal"
              placeholder="Time length of proposal"
              onChange={(e) => setTimeLength(e.target.value)}
              value={timeLength}
              required
            />
          </div>

          <div className="flex justify-between">
            <label class="inline-flex items-center cursor-pointer mt-5 mr-5">
              <span class="ms-3 mr-5 text-sm font-medium text-gray-900 dark:text-gray-300">{!qvEnabled ? "Enable" : "Disable"} Quadratic Voting</span>
              <input type="checkbox" value={qvEnabled} onChange={(e) => setQvEnabled(e.target.checked)} class="sr-only peer" />
              <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>

            <label class="inline-flex items-center cursor-pointer mt-5">
              <span class="ms-3 mr-5 text-sm font-medium text-gray-900 dark:text-gray-300">{!qvEnabled ? "Enable" : "Disable"} Linear Time Decay</span>
              <input type="checkbox" value={timeDecayEnabled} onChange={(e) => setTimeDecayEnabled(e.target.checked)} class="sr-only peer" />
              <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex flex-row justify-between items-center border border-gray-500 dark:border-gray-500 rounded-xl mt-5">
            <textarea
              className="block w-full text-sm resize-none
              bg-transparent border-0
              focus:outline-none focus:ring-0 h-20"
              type="text"
              name="description"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            ></textarea>
          </div>

          <button
            className="rounded-lg px-6 py-2.5 bg-blue-600
              text-white font-medium text-xs leading-tight
              uppercase hover:bg-blue-700 focus:bg-blue-700
              focus:outline-none focus:ring-0 active:bg-blue-800
              transition duration-150 ease-in-out mt-5"
            onClick={handleSubmit}
          >
            Submit Proposal
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateProposal


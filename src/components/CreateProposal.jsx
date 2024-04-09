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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !description) return

    // Parse candidate names into list of str
    const candidateNamesArr = candidateNames.split(",");
    console.log("List of candidate split names: " + candidateNamesArr);

    const proposal = { title, description, candidateNames }

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


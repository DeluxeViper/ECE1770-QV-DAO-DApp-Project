import { useState } from 'react'
import { useGlobalState, setGlobalState } from '../store'
import { toast } from 'react-toastify'
import { performContribute, applyNFT } from '../Blockchain.services'
import { Divider,Box, Button } from '@mui/material'

const Banner = () => {
  const [isStakeholder] = useGlobalState('isStakeholder')
  const [proposals] = useGlobalState('proposals')
  const [balance] = useGlobalState('balance')
  const [user] = useGlobalState('user')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)

  const onPropose = () => {
    // if (!isStakeholder) return
    setGlobalState('createModal', 'scale-100')
  }

  const onContribute = async () => {
    if (!!!amount || amount == '') return
    await performContribute(amount)
    toast.success('Contribution received')
  }

  const onApplyNFT = async() => {
    if (isStakeholder) return
    setLoading(true)
    await applyNFT().then(() => {
      toast.success('NFT application received')
      window.location.reload()
    }).catch((error) => {
      toast.error('Error applying for NFT')
    }).finally(() => setLoading(false))
  }

  const onAdminPage = () => {
    window.location.href = '/admin'
  }

  const opened = () =>
    proposals.filter(
      (proposal) => new Date().getTime() < Number(proposal.duration + '000'),
    ).length

  return (
    <div className="p-8">
      <h2 className="font-semibold text-3xl mb-5">
        {opened()} Proposal{opened() == 1 ? '' : 's'} Currently Opened
      </h2>
      <Box display={'flex'} sx={{justifyContent:'space-between'}}>
        <Box width={'30%'} minWidth={'250px'}>
          <p>
            User: {user.username}
          </p>
          <p>
          Current DAO Balance: <strong>{balance} Eth</strong> <br />
          Your contributions:{' '}
          <span>
            <strong>{user ? user.deposited:0} Eth</strong>
          </span>
        </p>
        </Box>
        <Divider orientation='vertical' flexItem />
        <Box justifyContent={'center'} justifyItems={'center'} justifySelf={'center'} alignItems={'center'} display={'flex'} flexDirection={'column'} padding={1}>
          {user && user.isAdmin ? <p>You are <strong>Admin</strong></p> : 
          isStakeholder ? <p>You are <strong>Stakeholder</strong></p> : 'You are not yet a stakeholder, apply for NFT '}
        </Box>
        <Box flex={1} display={'flex'} justifyContent={'flex-end'} sx={{gap:2}} flexWrap={'wrap'}>
          {user && !isStakeholder && user.status == 0 &&
            <button
            type="button"
            className={`inline-block px-6 py-2.5
            bg-blue-600 text-white font-medium text-xs
            leading-tight uppercase shadow-md rounded-full
            hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
            focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-blue-800 active:shadow-lg transition
            duration-150 ease-in-out dark:text-blue-500
            dark:border dark:border-blue-500 dark:bg-transparent`}
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          onClick={onApplyNFT}
          disabled={loading}
          >
            {loading ? 'Applying...' : 'Apply for NFT'}
          </button>}
        {user && user.isAdmin &&
        <button
            type="button"
            className={`inline-block px-6 py-2.5
            bg-blue-600 text-white font-medium text-xs
            leading-tight uppercase shadow-md rounded-full
            hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
            focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-blue-800 active:shadow-lg transition
            duration-150 ease-in-out dark:text-blue-500
            dark:border dark:border-blue-500 dark:bg-transparent`}
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          onClick={onAdminPage}
        >
          Go to Admin Page
        </button>
        }
        </Box>
      </Box>
      <hr className="my-6 border-gray-300 dark:border-gray-500" />
      <div
        className="flex flex-row justify-start items-center space-x-3 mt-4"
        role="group"
      >
        <button
          type="button"
          className={`inline-block px-6 py-2.5
            bg-blue-600 text-white font-medium text-xs
            leading-tight uppercase shadow-md rounded-full
            hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
            focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-blue-800 active:shadow-lg transition
            duration-150 ease-in-out dark:text-blue-500
            dark:border dark:border-blue-500 dark:bg-transparent`}
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          onClick={onPropose}
        >
          Create Proposal
        </button>

      </div>
    </div>
  )
}

export default Banner


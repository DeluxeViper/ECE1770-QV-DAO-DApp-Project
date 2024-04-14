import { useEffect, useState } from 'react';
import { toast } from 'react-toastify'
import { mintNFT, grantAdminRole } from '../Blockchain.services'

const UsersList = ({
  allUsers,
  user,
  isAdminList,
  setIsAdminList,
}) => {
  const [whitelistedUsers, setWhitelistedUsers] = useState([]); // TODO: Unimplemented
  const [anonymousVoters, setAnonymousVoters] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
      const anonymousVoters = getAnonymousVoters();
      setAnonymousVoters(anonymousVoters);
  }, [allUsers]);


  const getAnonymousVoters = () => {
    return allUsers.filter(user => user.status === "1") 
  }

  // Handler for generating NFT
  const handleGenerateNFTs = async (user) => {
    setLoading(true);
    console.log(`Generate NFT for ${user}`);
    // Add integration logic her
    mintNFT(user.voterAddress).then(() => {
      toast.success('NFT generated successfully');
      let temp = [...anonymousVoters];
      temp = temp.filter((item) => item !== user);
      setAnonymousVoters(temp);
    }).catch((error) => {
      console.error("Error generating NFT:", error);
      toast.error('Error generating NFT');
    }).finally(() => {
      setLoading(false);
    });
  };

  const grantAdmin = async (user, index) => {
    setLoading(true);
    console.log(`Grant Admin Role to ${user}`);
    grantAdminRole(user.voterAddress).then(() => {
      toast.success('Admin role granted successfully');
      let temp = [...isAdminList];
      temp[index] = true;
      setIsAdminList(temp);
    }).catch((error) => {
      console.error("Error granting Admin role:", error);
      toast.error('Error granting Admin role');
    }).finally(() => {
      setLoading(false);
    });
    // Add integration logic here
  }

  const handleWhitelistUser = (username) => {
    console.log(`Whitelist ${username}`);
    // Add integration logic here
  };

  return (
    <div className="mt-4 text-center">
      <div className="sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow-md rounded-md">
            <table className="min-w-full">
              <thead className="border-b dark:border-gray-500">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium px-6 py-4 text-left"
                  >
                    User Name
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium px-6 py-4 text-left"
                  >
                    Type of User
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium px-6 py-4 text-left"
                  >
                    Amount Contributed (ETH)
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium px-6 py-4 text-left"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {allUsers && allUsers.length && allUsers.map((user, i) => (
                  <tr
                    key={i}
                    className="border-b dark:border-gray-500 transition duration-300 ease-in-out"
                  >
                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-row justify-start items-center space-x-3">
                        <span>{user.username}</span>
                      </div>
                    </td>
                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-row justify-start items-center space-x-3">
                        <span>{user.status === "2" ? 'Stakeholder' : user.status === "1" ? 'In Progress' : 'Contributor'}</span>
                      </div>
                    </td>
                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-row justify-start items-center space-x-3">
                        <span>{window.web3.utils.fromWei(user.depositedAmount) + ' ETH'}</span>
                      </div>
                    </td>
                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                      <div className="flex">
                        {
                          whitelistedUsers.includes(user) && <button
                            className="border-2 rounded-full px-6 py-2.5 border-blue-600
                          text-blue-600 font-medium text-xs leading-tight
                          uppercase hover:border-blue-700 focus:border-blue-700
                          focus:outline-none focus:ring-0 active:border-blue-800
                          transition duration-150 ease-in-out"
                            disabled={loading}
                            onClick={() => handleWhitelistUser(user)}
                          >
                            Whitelist User
                          </button>
                        }
                        {
                          anonymousVoters.includes(user) && <button
                            className="border-2 rounded-full px-6 py-2.5 border-blue-600
                          text-blue-600 font-medium text-xs leading-tight
                          uppercase hover:border-blue-700 focus:border-blue-700
                          focus:outline-none focus:ring-0 active:border-blue-800
                          transition duration-150 ease-in-out mr-2"
                            disabled={loading}
                            onClick={() => handleGenerateNFTs(user)}
                          >
                            Generate NFT
                          </button>
                        }
                        {
                          !isAdminList[i] && <button
                            className="border-2 rounded-full px-6 py-2.5 border-blue-600
                          text-blue-600 font-medium text-xs leading-tight
                          uppercase hover:border-blue-700 focus:border-blue-700
                          focus:outline-none focus:ring-0 active:border-blue-800
                          transition duration-150 ease-in-out"
                            disabled={loading}
                            onClick={() => grantAdmin(user, i)}
                          >
                            Set Admin
                          </button>
                        }
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
  )
}

export default UsersList;

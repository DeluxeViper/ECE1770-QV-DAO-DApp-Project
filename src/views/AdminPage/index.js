import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button, List, ListItem, ListItemText } from '@mui/material';
import { useGlobalState } from '../../store';
import "../../styles.css";
import { getAllUsers, mintNFT, grantAdminRole } from '../../Blockchain.services';

function AdminPage() {
  // States to store different categories of users
  const [allUsers, setAllUsers] = useState([]);
  const [whitelistedUsers, setWhitelistedUsers] = useState([]);
  const [anonymousVoters, setAnonymousVoters] = useState([]);
  const [user] = useGlobalState('user');
  const [contract] = useGlobalState('contract');
  const [loading, setLoading] = useState(false);

  // Deploying 'QuadraDAO' contract address after running truffle migrate --reset

  // Fetch users from localStorage on component mount
  useEffect(() => {
    console.log(contract);
    getAllUsers().then((users) => {
      console.log("Users:", users);
      setAllUsers(users);
      // filter userslist to get whitelisted users
      // filter anonymous voters (who applied for NFT)
      const anomyous = users.filter(user => {
        console.log(user);
        return user.voter.status == 1;
      });
      setAnonymousVoters(anomyous);
    }).catch((error) => {
      console.error("Error fetching users:", error);
    });
  }, [contract]);

  // Handler for generating NFT

  const handleGenerateNFTs = async (user) => {
    setLoading(true);
    console.log(`Generate NFT for ${user}`);
    // Add integration logic her
    mintNFT(user.voterAddress).then(() => {
      toast.success('NFT generated successfully');
    }).catch((error) => {
      console.error("Error generating NFT:", error);
      toast.error('Error generating NFT');
    }).finally(() => {
      setLoading(false);
    });
  };

  const grantAdmin = async (user) => {
    setLoading(true);
    console.log(`Grant Admin Role to ${user}`);
    grantAdminRole(user.voterAddress).then(() => {
      toast.success('Admin role granted successfully');
    }).catch((error) => {
      console.error("Error granting Admin role:", error);
      toast.error('Error granting Admin role');
    }).finally(() => {
      setLoading(false);
    });
    // Add integration logic here
  }

  //add user account [ accounts[1]]
//   const handleGenerateNFTs = async (userAddress = accounts[1]) => {
//     const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
//     //await provider.send("eth_requestAccounts", []);
//     const signer = provider.getSigner();
//     console.log(window.ethereum);
//     const account = await signer.getAddress();
//     console.log("Account:", account);
//     const checkedAddress = ethers.utils.getAddress(userAddress);
//     const contract = new ethers.Contract(nft_contract_address, QuadraDAOABI.abi, signer);

//     try {
//         const transaction = await contract.safeMint(checkedAddress, 'https://ipfs.io/ipfs/QmS6pfArdSefpB9F3uemwvrACdexTiQuQ1iAonMhmyBw66');
//         await transaction.wait();
//         console.log(`NFT generated for ${userAddress}`);
//     } catch (error) {
//         console.error(`Error generating NFT for ${userAddress}:`, error);
//     }
// };


  // Handler for whitelisting user
  const handleWhitelistUser = (username) => {
    console.log(`Whitelist ${username}`);
    // Add integration logic here
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h3" sx={{ mt: 2, mb: 2 }}>
        Admin Dashboard
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4">All Users</Typography>
        <List>
          {allUsers.map((user) => (
            <ListItem key={user}>
              <ListItemText primary={user.username} sx={{ '.MuiTypography-root': { fontSize: '1.3rem' } }} />
              <ListItemText
                primary={user.status == 2 ? 'StakeHolder' : user.status == 1 ? 'In Progress' : 'Contributor'}
                sx={{ '.MuiTypography-root': { fontSize: '1.3rem' } }}
                secondary={'contributed: ' + window.web3.utils.fromWei(user.depositedAmount)+ ' Eth'}
              />
              {whitelistedUsers.includes(user) && (
                <Button
                  onClick={() => handleWhitelistUser(user)}
                  sx={{ backgroundColor: '#0F52BA', color: 'white', '&:hover': { backgroundColor: 'darkgray' }, }}
                  disabled={loading}
                >Whitelist User</Button>
              )}
              {anonymousVoters.includes(user) && (
                //add user account [ accounts[1]]
                <Button
                  onClick={() => handleGenerateNFTs(user)}
                  sx={{ backgroundColor: '#228B22', color: 'white', '&:hover': { backgroundColor: 'darkgray' }, }}
                  disabled={loading}
                >Generate NFT</Button>
              )}
              {
                !user.isAdmin && (
                  <Button disabled={loading} onClick={() => grantAdmin(user)} sx={{ backgroundColor: '#228B22', color: 'white', '&:hover': { backgroundColor: 'darkgray' }, }}>Set Admin</Button>
                )
              }
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default AdminPage;

import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button, List, ListItem, ListItemText } from '@mui/material';
import "../../styles.css";

function AdminPage() {
  // States to store different categories of users
  const [allUsers, setAllUsers] = useState([]);
  const [whitelistedUsers, setWhitelistedUsers] = useState([]);
  const [anonymousVoters, setAnonymousVoters] = useState([]);

  // Fetch users from localStorage on component mount
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const whitelisted = JSON.parse(localStorage.getItem('whitelistedUsers') || '[]');
    const anonymous = JSON.parse(localStorage.getItem('anonymousVoters') || '[]');
    
    setAllUsers(Object.keys(users));
    setWhitelistedUsers(whitelisted);
    setAnonymousVoters(anonymous);
  }, []);

  // Handler for generating NFTs
  const handleGenerateNFTs = (username) => {
    console.log(`Generate NFT for ${username}`);
    // Integration with blockchain to mint NFT would go here
  };

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
              <ListItemText primary={user} sx={{ '.MuiTypography-root': { fontSize: '1.3rem' } }} />
              {whitelistedUsers.includes(user) && (
                <Button onClick={() => handleWhitelistUser(user)} sx={{ backgroundColor: '#0F52BA', color: 'white', '&:hover': { backgroundColor: 'darkgray' }, }}>Whitelist User</Button>
              )}
              {anonymousVoters.includes(user) && (
                <Button onClick={() => handleGenerateNFTs(user)} sx={{ backgroundColor: '#228B22', color: 'white', '&:hover': { backgroundColor: 'darkgray' }, }}>Generate NFT</Button>
              )}
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default AdminPage;

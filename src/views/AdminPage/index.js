import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useGlobalState } from '../../store';
import "../../styles.css";
import { getAllUsers } from '../../Blockchain.services';
import UsersList from "../../components/UsersList";

function AdminPage() {
  // States to store different categories of users
  const [allUsers, setAllUsers] = useState([]);
  const [user] = useGlobalState('user');
  const [contract] = useGlobalState('contract');
  const [isAdminList, setIsAdminList] = useState([]);

  // Deploying 'QuadraDAO' contract address after running truffle migrate --reset

  // Fetch users from localStorage on component mount
  useEffect(() => {
    getAllUsers().then((users) => {
      console.log("Users:", users);
      setAllUsers(users[0]);
      setIsAdminList(users[1]);
      // filter userslist to get whitelisted users
    }).catch((error) => {
      console.error("Error fetching users:", error);
    });
  }, [contract]);

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h3" sx={{ mt: 2, mb: 2 }}>
        Admin Dashboard
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4">All Users</Typography>
        <UsersList allUsers={allUsers} isAdminList={isAdminList} setIsAdminList={setIsAdminList} user={user} contract={contract} />
      </Box>
    </Container>
  );
}

export default AdminPage;

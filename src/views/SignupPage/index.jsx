import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Grid, Link } from '@mui/material';
import {addUser} from '../../Blockchain.services';
import { toast } from 'react-toastify'

function SignupPage() {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(username).then((user) => {
      toast.success('User added successfully');
      window.location.reload();
    }).catch((error) => {
      console.error("Error adding user:", error);
      toast.error('Error adding user');
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Register with QuadraDAO
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Signup
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default SignupPage;

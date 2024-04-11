import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container, Box, Typography, TextField, Button, Grid, Link
} from "@mui/material";
import { useEth } from "../../contexts/EthContext"; // Ensure the correct import path

function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { addUser } = useEth(); // Correctly using the addUser function from the EthProvider
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    addUser(username, password); // Adding the user using the context
    console.log(`User added: ${username}`);
    alert('Signup successful. You can now login.');
    navigate('/'); // Navigate to the login page after successful signup
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Sign up</Typography>
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
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignupPage;

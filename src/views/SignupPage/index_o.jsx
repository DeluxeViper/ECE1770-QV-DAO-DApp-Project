import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container, Box, Typography, TextField, Button, Grid, Link
} from "@mui/material";
// Import your useEth hook or context as needed



function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // Replace with actual useEth hook/context usage if needed
  const { state } = { accounts: ["dummy-account"] }; // Placeholder for Ethereum context

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${process.env.BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          // Include Ethereum account if necessary
          account: state?.accounts[0]
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json(); // Parse the JSON error response
        throw new Error(errorResponse.error || 'Signup failed. Please try again later.');
      }

      const successResponse = await response.json(); // Parse the successful JSON response
      alert(successResponse.message);
      navigate('/'); // Navigate to login page on successful signup
    } catch (error) {
      console.error('Error during signup:', error);
      alert(error.message);
    }
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
        <Typography component="h1" variant="h2">
          User Signup
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
          <Grid container>
            <Grid item xs>
              {/* Link to your password recovery route if available */}
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/" variant="body2">
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





/*import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Container, Box, Typography, TextField, Button, Grid, Link
} from "@mui/material";
import useEth from "../../contexts/EthContext/useEth";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { state } = useEth();
  const navigate = useNavigate(); // Hook for navigating programmatically

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${process.env.BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, account: state?.accounts[0] }),
      });

      if (!response.ok) {
        throw new Error('Signup request failed');
      }

      const data = await response.json();

      alert(data.message || 'Signup successful!');
      // Navigate to login page after successful signup
      navigate('/');
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Signup failed. Please try again later.');
    }
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
        <Typography component="h1" variant="h2">
          User Signup
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <Typography component="h3" variant="h6">
            Address: {state && state.accounts ? state.accounts[0] : "Not connected"}
          </Typography>
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
          <Grid container>
            <Grid item xs />
            <Grid item>
              <Link variant="body2" component={RouterLink} to="/login">
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignupPage;
*/

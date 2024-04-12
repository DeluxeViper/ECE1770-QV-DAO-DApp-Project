import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext/UserContext'; // Adjust the import path as needed
import {
  Container
  , Box
  , Typography
  , TextField
  , FormControlLabel
  , Checkbox
  , Button
  , Grid
  , Link
} from "@mui/material";

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { users } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the credentials are for an admin
    if (username === 'admin' && password === 'admin') {
      console.log("Admin login successful");
      navigate('/admin'); // Navigate to admin page for admin
    } else {
      // For regular users, verify against the stored users context
      const userPassword = users[username];
      if (userPassword && userPassword === password) {
        console.log("Login successful");
        localStorage.setItem('currentUser', username); 
        navigate('/user'); // Navigate to user page for regular users
      } else {
        alert('Invalid username or password');
      }
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
           User Login
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
            onChange={e => setPassword(e.target.value)}
          />
           <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link variant="body2" component={RouterLink} to="/signup">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;

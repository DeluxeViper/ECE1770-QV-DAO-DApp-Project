import * as React from 'react';
import { Box,Typography,CircularProgress } from '@mui/material';

const BeforeLoginPage = () => {
    return (
      <Box sx={{ display: 'flex',flexDirection:'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <CircularProgress size={100} />
        <Typography variant="h3" color="textSecondary" sx={{ ml: 2 }}>
          Connecting to MetaMask...
        </Typography>
      </Box>
    )
  }
  
  export default BeforeLoginPage
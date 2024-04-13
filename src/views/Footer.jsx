import * as React from 'react';
import {
    Box,
    Grid,
    Link,
    Container,
    Typography,
    TextField,
    Divider,
    IconButton
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import UofTLogo from '../public/utoronto.png';

function Copyright() {
  return (
    <React.Fragment>
      {'© '}
      <Link color="inherit" href="https://quadradao-app.azurewebsites.net/">
        QuadraDAO
      </Link>{' '}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const iconStyle = {
  width: 48,
  height: 48,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  mr: 1,
  '&:hover': {
    bgcolor: 'grey.200'
  },
};

export default function AppFooter() {
  return (
    <Typography
      component="footer"
      sx={{ display: 'flex'}}
    >
      <Container sx={{ my: 4, display: 'flex',flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Divider flexItem />
        <Grid container spacing={2} >
            <Grid item xs={8} alignContent={'center'}>
                <Copyright />
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <IconButton sx={iconStyle} href="https://github.com/DeluxeViper/ECE1770-QV-DAO-DApp-Project">
                  <GitHubIcon />
                </IconButton>
                <IconButton sx={iconStyle} href="https://www.utoronto.ca/">
                  <img src={UofTLogo} alt="UofT Logo" />
                </IconButton>
              </Box>
            </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}
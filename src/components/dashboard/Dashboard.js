import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import HomeIcon from '@mui/icons-material/Home';

// Components

// Styles
import { AppBar } from './styled.components';



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const NavigationBar = (props, { open, setOpen }) => {
  // const navigate = useNavigate()
  // const { mode: colorMode, toggleMode } = useColorMode()
  return (
    <AppBar position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Sell It
        </Typography>
        {props.navBarItems 
          ? props.navBarItems.map(el => el)
          : (
          <>
            <IconButton color="inherit">
              <Badge badgeContent={0} color="secondary">
                <AccountBalanceWalletIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <HomeIcon />
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>

  )
}


function DashboardContent(props) {
  return (
      <Box sx={{ display: 'flex' }}>
        <NavigationBar open={false} navBarItems={props.navBarItems} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth={false} sx={{ mt: 0, mb: 0 }}>
            {props.children}
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
  );
}

const Dashboard = (props) => <DashboardContent {...props} />

export default Dashboard

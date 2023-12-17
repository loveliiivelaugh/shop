import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Box, Drawer, IconButton, Tooltip } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Dashboard from './components/dashboard/Dashboard.js';
import './App.css';


function useColorMode() {
  const [colorMode, setMode] = useState('light');
  const toggleMode = () => setMode(mode => (mode === 'light') ? 'dark' : 'light');
  return { colorMode, toggleMode };
}

function App() {
  // const navigate = useNavigate()
  const { colorMode, toggleMode } = useColorMode();
  const [cartOpen, setCartOpen] = useState(false);
  const toggleCart = (toggle) => setCartOpen(toggle ? toggle : !cartOpen);
  
  const navBarIcons = [
    <Tooltip title="Home">
      <IconButton color="inherit" onClick={() => {}}>
        <HomeIcon />
      </IconButton>
    </Tooltip>,
    <Tooltip title="Shopping Cart">
      <IconButton color="inherit" onClick={toggleCart}>
        <ShoppingCart />
      </IconButton>
    </Tooltip>,
    <Tooltip title={colorMode === 'light' ? 'Light Mode' : 'Dark Mode'}>
      <IconButton color="inherit" onClick={toggleMode}>
        {colorMode === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  ];
  
  return (
    <>
      <Drawer
        anchor={'right'}
        open={cartOpen}
        onClose={() => toggleCart(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => toggleCart(false)}
          onKeyDown={() => toggleCart(false)}
        >
          <h2>Cart</h2>
          <div className="products">
            <div className="product">
              <h3>Product 1</h3>
              <p>Price: $10.00</p>
            </div>
            <div className="product">
              <h3>Product 2</h3>
              <p>Price: $20.00</p>
            </div>
          </div>
        </Box>
      </Drawer>
    <Dashboard navBarIcons={navBarIcons}>
    {/* Products Section */}
    </Dashboard>
    </>
  );
}

export default App;

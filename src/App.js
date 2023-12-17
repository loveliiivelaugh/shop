import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardActionArea, Drawer, Grid, IconButton, Tooltip } from '@mui/material';
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

const item = {
  name: 'Product',
  price: 10.00,
  description: 'This is a product.',
  image: 'https://picsum.photos/200/300'
};

const items = new Array(30)
  .fill(item)
  .map((item, i) => ({ 
    ...item, 
    id: i, 
    name: `${item.name} ${i + 1}` 
  }));

function App() {
  // const navigate = useNavigate()
  const { colorMode, toggleMode } = useColorMode();
  const [cartOpen, setCartOpen] = useState(false);
  const cart = [];
  const cartIncludesItem = item => cart.find(cartItem => cartItem.id === item.id)
  
  const navBarIcons = [
    <Tooltip title="Home">
      <IconButton color="inherit" onClick={() => {}}>
        <HomeIcon />
      </IconButton>
    </Tooltip>,
    <Tooltip title="Shopping Cart">
      <IconButton color="inherit" onClick={() => setCartOpen(!cartOpen)}>
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
        onClose={() => setCartOpen(false)}
      >
        <Box
          sx={{ width: 250, mt: 8, px: 2 }}
          role="presentation"
          onClick={() => setCartOpen(false)}
          onKeyDown={() => setCartOpen(false)}
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
      <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      {items.map(item => (
        <Grid item md={3} className="product" key={item.id}>
          <Card sx={{p:2}}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <p>{item.description}</p>
            <CardActionArea sx={{ display: "flex", justifyContent: "end", gap: 1 }}>
              {cartIncludesItem(item) && <Button color="error" variant="outlined">Remove</Button>}
              {cartIncludesItem(item) ? (
                <Button color="primary" variant="contained">+</Button>
              ) : (<Button color="primary" variant="contained">Add to Cart</Button>)}
            </CardActionArea>
          </Card>
        </Grid>
      ))}
      </Grid>
    </Dashboard>
    </>
  );
}

export default App;

import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Card, CardActionArea, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemText, Tooltip, Typography } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Dashboard from './components/dashboard/Dashboard.js';
import { shop as shopActions } from './redux'
import './App.css';
import { Badge } from '@mui/base';


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
  const dispatch = useDispatch();
  const { shop } = useSelector(state => state);
  // const navigate = useNavigate()
  const { colorMode, toggleMode } = useColorMode();
  const [cartOpen, setCartOpen] = useState(false);
  console.log("states", shop, shopActions);
  const cart = shop.lineItems || [];
  const cartIncludesItem = item => cart.find(cartItem => cartItem.id === item.id)
  const calculateTotal = (x) => x.reduce((acc, item) => acc + item.price, 0);
  
  const navBarIcons = [
    <Tooltip title="Home">
      <IconButton color="inherit" onClick={() => {}}>
        <HomeIcon />
      </IconButton>
    </Tooltip>,
    <Tooltip title="Shopping Cart">
      <Badge badgeContent={cart.length} color="secondary">
        <IconButton color="inherit" onClick={() => setCartOpen(!cartOpen)}>
          <ShoppingCart />
        </IconButton>
      </Badge>
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
          <Typography variant="h3">Cart</Typography>
          <Divider />
          <List>
          {cart.length && cart.map(item => (
            <ListItem className="product" key={item.id}>
            {console.log("item", item)}
              <ListItemText primary={item.title} secondary={"$" + item.price} />
              <Button variant="outlined" color="error" onClick={() => dispatch(shopActions.removeProduct(item))}>Remove</Button>
            </ListItem>
          ))}
          </List>
          <Divider />
          <Typography variant="body1" gutterBottom>Items: {cart.length}</Typography>
          <Typography variant="body1" gutterBottom>Total: ${calculateTotal(cart)}</Typography>
          <Button variant="contained" color="primary" onClick={() => {}}>Checkout</Button>
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
              {cartIncludesItem(item) ? (
                <>
                  <Button 
                    color="error" 
                    variant="outlined"
                    onClick={() => dispatch(shopActions.removeProduct(item))}
                  >
                    Remove
                  </Button>
                  <Button color="primary" variant="contained">+</Button>
                </>
              ) : (
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => dispatch(shopActions.addProduct(item))}
                >
                  Add to Cart
                </Button>
              )}
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

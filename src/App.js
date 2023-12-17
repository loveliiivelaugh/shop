// Packages
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { 
  Badge, Box, Button, Divider, Drawer, 
  IconButton, List, ListItem, ListItemText, Tooltip, Typography
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCart from '@mui/icons-material/ShoppingCart';

// Components
import Dashboard from './components/dashboard/Dashboard.js';
import ProductsSection from './components/ProductsSection.jsx';

// Utilities
import { shop as shopActions } from './redux'
import './App.css';


function useColorMode() {
  const [colorMode, setMode] = useState('light');
  const toggleMode = () => setMode(mode => (mode === 'light') ? 'dark' : 'light');
  return { colorMode, toggleMode };
}

function App(props) {
  // Hooks / State
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shop } = useSelector(state => state);
  const { colorMode, toggleMode } = useColorMode();
  const [cartOpen, setCartOpen] = useState(false);

  // Helpers
  const cart = shop.lineItems || [];

  // Handlers
  const calculateTotal = (x) => x.reduce((acc, item) => acc + item.price, 0);
  const handleCheckout = () => {
    // TODO: Handle checkout
    setCartOpen(false);
  }

  
  const navBarIcons = [
    <Tooltip title="Home">
      <IconButton color="inherit" onClick={() => navigate("/")}>
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
              <ListItemText primary={item.title} secondary={"$" + item.price} />
              <Button variant="outlined" color="error" onClick={() => dispatch(shopActions.removeProduct(item))}>Remove</Button>
            </ListItem>
          ))}
          </List>
          <Divider />
          <Typography variant="body1" gutterBottom>Items: {cart.length}</Typography>
          <Typography variant="body1" gutterBottom>Total: ${calculateTotal(cart)}</Typography>
          <Button variant="contained" color="primary" onClick={handleCheckout}>Checkout</Button>
        </Box>
      </Drawer>
      <Dashboard navBarIcons={navBarIcons}>
        {props.children}
      </Dashboard>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App><ProductsSection /></App>,
  },
  {
    path: "/products",
    element: <App><ProductsSection /></App>,
  },
  {
    path: "/product/:id",
    element: <App><>Single Product Page</></App>,
  },
]);

export default () => <RouterProvider router={router} />;

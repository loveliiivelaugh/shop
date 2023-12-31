import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardActionArea, Grid } from '@mui/material'

import { api } from '../api'
import { shop as shopActions } from '../redux'


const ProductsSection = (props) => {
  // Hooks / State
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shop } = useSelector(state => state);
  const items = api.getProducts();

  // Helpers
  const cart = shop.lineItems || [];

  // Handlers
  const handleCardClick = (item) => navigate("/product/" + item.id);
  const cartIncludesItem = item => cart.find(cartItem => cartItem.id === item.id);

  return (
    <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      {items.map(item => (
        <Grid item md={3} className="product" key={item.id}>
          <Card sx={{p:2}} onClick={() => handleCardClick(item)}>
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
  )
}

export default ProductsSection
import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  itemsAmount: 0,
  lineItems: [],
  total: 0,
}

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {

    addProduct: (state, action) => {
      const product = action.payload
      const { lineItems } = state

      const lineItem = lineItems.find((item) => item.id === product.id)

      if (lineItem) {
        lineItem.quantity += 1
      } else {
        lineItems.push({
          id: product.id,
          title: product.name,
          price: product.price,
          quantity: 1,
        })
      }
    },

    removeProduct: (state, action) => {
      const product = action.payload
      const { lineItems } = state

      const lineItem = lineItems.find((item) => item.id === product.id)

      if (lineItem) {
        lineItem.quantity -= 1
      }

      if (lineItem.quantity === 0) {
        const index = lineItems.findIndex((item) => item.id === product.id)
        lineItems.splice(index, 1)
      }
    },
    
    
    increment: (state, payload) => {

      console.log('shop.slice.js: increment() = ', state, payload)
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.itemsAmount += 1
    },
    decrement: (state) => {
      state.itemsAmount -= 1
    },
    incrementByAmount: (state, action) => {
      state.itemsAmount += action.payload
    },

    clearCart: (state) => {
      state.itemsAmount = 0
      state.lineItems = []
      state.total = 0
    },

  },
})

// Action creators are generated for each case reducer function
export const {
  increment,
  decrement,
  incrementByAmount,
  addProduct,
  removeProduct,
  clearCart,
  handleCheckout,
} = shopSlice.actions


export default shopSlice.reducer
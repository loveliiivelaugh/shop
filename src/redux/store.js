import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'

// API
// import { shopApi } from '../api'

// Reducers
// import { shopSlice, alertSlice, systemSlice, authSlice, posSlice } from './features'


const store = configureStore({
  reducer: {
    // shop: shopSlice,
    // alerts: alertSlice,

    // // Add the generated reducer as a specific top-level slice
    // [shopApi.reducerPath]: shopApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
    // .concat(shopApi.middleware)
  devTools: process.env.NODE_ENV !== 'production',
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

export { store }
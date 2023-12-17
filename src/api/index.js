// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Products'],
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.CMS_URL}` }),
  endpoints: (builder) => ({
    getProducts: builder.query({ query: () => `/products` }),
  })
})

// Test items and endpoint
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

api.getProducts = () => items;

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductsQuery } = api
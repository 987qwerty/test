import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Определяем тип продукта
export type Products = {
    items:{
        id: number
        title: string
        price: number
        image_url: string
    }[]

}

// Создаем API
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://o-complex.com:1337/' }),
  endpoints: (builder) => ({
     getProductPage: builder.query<Products[], { page: number; limit: number }>({
        query: ({ page = 1, limit = 10 }) => `products?page=${page}&limit=${limit}`,
     }),

   
  }),
})

// Экспортируем хук
export const { useGetProductPageQuery } = productsApi
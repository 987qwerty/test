import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type OrderRequest = {
  phone: string
  items: CartItem[]
}

export type OrderResponse = {
  success: boolean
  message?: string
}

const orderApi = createApi({
  reducerPath: 'orderApi',
  // тестовый url 
  baseQuery: fetchBaseQuery({ baseUrl: 'https://echo.free.beeceptor.com'  }),
  endpoints: (builder) => ({
    sendOrder: builder.mutation<OrderResponse, OrderRequest>({
      query: (body) => ({
        url: '/order',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useSendOrderMutation } = orderApi
export default orderApi
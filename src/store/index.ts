import { configureStore } from '@reduxjs/toolkit'
import { reviewsApi } from '../services/reviewsApi'
import cartReducer from './cartSlice'
import { productsApi } from '@/services/productsApi'
import { useDispatch, useSelector } from 'react-redux'

import  orderReducer from '@/services/orderApi'


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [orderReducer.reducerPath]: orderReducer.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(reviewsApi.middleware)
      .concat(productsApi.middleware)
      .concat(orderReducer.middleware),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
import { configureStore } from '@reduxjs/toolkit'
import { reviewsApi } from '../services/reviewsApi'
import { productsApi } from '@/services/productsApi'

export const store = configureStore({
  reducer: {
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(reviewsApi.middleware)
      .concat(productsApi.middleware),
})
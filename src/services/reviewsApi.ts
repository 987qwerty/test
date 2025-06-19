import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const reviewsApi = createApi({
  reducerPath: 'reviewsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://o-complex.com:1337/' }),
  endpoints: (builder) => ({
    getReviews: builder.query<Review[], void>({
      query: () => 'reviews',
    }),
  }),
});

export const { useGetReviewsQuery } = reviewsApi;
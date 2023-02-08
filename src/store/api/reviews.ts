import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { ReviewType } from 'types/reviewType';

export const reviewsApi = createApi({
  reducerPath: 'reviewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/'
  }),
  tagTypes: ['Reviews'],
  endpoints: ({ query }) => ({
    getAllReviews: query({
      query: (arg) => `reviews?page=${arg.page}`
    }),
    getSingleReview: query<ReviewType, string>({
      query: (id) => `reviews?id=${id}`
    }),
  })
});

export const { useGetAllReviewsQuery, useGetSingleReviewQuery } = reviewsApi;

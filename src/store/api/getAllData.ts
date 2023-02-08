import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const getAllDataApi = createApi({
  reducerPath: 'getAllDataApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/'
  }),
  tagTypes: ['getAllData'],
  endpoints: ({ query }) => ({
    getAllData: query({
      query: () => 'getAllData'
    })
  })
});

export const { useGetAllDataQuery } = getAllDataApi;

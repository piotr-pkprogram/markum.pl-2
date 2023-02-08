import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { EstateType } from 'types/estateType';

export const estatesApi = createApi({
  reducerPath: 'estatesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/'
  }),
  tagTypes: ['Estates'],
  endpoints: ({ query, mutation }) => ({
    getAllEstates: query({
      query: (arg) =>
        arg ? `estates?page=${arg.page}&category=${arg.category}&isMore=${arg.isMore}` : 'estates'
    }),
    getSingleEstateById: query<{ estate: EstateType; success: boolean }, string>({
      query: (id) => `estates?id=${id}`
    }),
    getSingleEstateByLink: query<{ estate: EstateType; success: boolean }, string>({
      query: (link) => `estates?link=${link}`
    })
  })
});

export const { useGetAllEstatesQuery, useGetSingleEstateByIdQuery, useGetSingleEstateByLinkQuery } =
  estatesApi;

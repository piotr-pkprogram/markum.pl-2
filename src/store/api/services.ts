import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { ServiceType } from 'types/serviceType';
import { ReviewType } from 'types/reviewType';

export const servicesApi = createApi({
  reducerPath: 'servicesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/'
  }),
  tagTypes: ['Services'],
  endpoints: ({ query }) => ({
    getAllServices: query({
      query: () => 'services'
    }),
    getSingleServiceById: query<{ service: ServiceType }, string>({
      query: (id) => `services?id=${id}`
    }),
    getSingleServiceByLink: query<{ service: ServiceType; reviews: ReviewType[] }, string>({
      query: (link) => `services?link=${link}`
    })
  })
});

export const {
  useGetAllServicesQuery,
  useGetSingleServiceByIdQuery,
  useGetSingleServiceByLinkQuery
} = servicesApi;

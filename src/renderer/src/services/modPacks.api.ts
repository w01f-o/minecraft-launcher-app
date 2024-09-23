import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const modPacksApi = createApi({
  reducerPath: 'modPacksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({
    getModPacks: builder.query({
      query: () => `/modpacks`
    })
  })
})

export const { useGetModPacksQuery } = modPacksApi

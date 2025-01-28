import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Modpack } from '../model';

export const modpacksApi = createApi({
  reducerPath: 'modPacksApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: builder => ({
    getModPacks: builder.query<Modpack[], void>({
      query: () => '/modpacks',
    }),
    getModPackById: builder.query<Modpack, string>({
      query: (id: string) => `/modpacks/${id}`,
    }),
  }),
});

export const { useGetModPacksQuery } = modpacksApi;

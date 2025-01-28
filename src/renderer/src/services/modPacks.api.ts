import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ModPack } from '../types/entities/ModPack.type';

export const modPacksApi = createApi({
  reducerPath: 'modPacksApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: builder => ({
    getModPacks: builder.query<ModPack[], void>({
      query: () => '/modpacks',
    }),
    getModPackById: builder.query<ModPack, string>({
      query: (id: string) => `/modpacks/${id}`,
    }),
  }),
});

export const { useGetModPacksQuery } = modPacksApi;

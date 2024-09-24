import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ModPack } from '@renderer/types/ModPack.type';

export const modPacksApi = createApi({
  reducerPath: 'modPacksApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getModPacks: builder.query<ModPack[], void>({
      query: () => `/modpack`,
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getModPackById: builder.query<ModPack & Record<string, any>, string>({
      query: (id: string) => `/modpack/${id}`,
    }),
  }),
});

export const { useGetModPacksQuery } = modPacksApi;

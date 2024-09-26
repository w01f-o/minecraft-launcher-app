import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Character } from '../types/entities/Character.type';

export const characterApi = createApi({
  reducerPath: 'characterApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ['Character'],
  endpoints: (builder) => ({
    getCharacter: builder.query<Character, string>({
      query: (hwid: string) => `/character/hwid/${hwid}`,
      providesTags: ['Character'],
    }),
    updateCharacter: builder.mutation<Character, FormData>({
      query: (updateOrCreateDto: FormData) => ({
        url: `/character`,
        method: 'PATCH',
        body: updateOrCreateDto,
      }),
      invalidatesTags: ['Character'],
    }),
    deleteCape: builder.mutation<Character, string>({
      query: (hwid: string) => ({
        url: `/character/cape/${hwid}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Character'],
    }),
  }),
});

export const { useGetCharacterQuery, useUpdateCharacterMutation, useDeleteCapeMutation } =
  characterApi;

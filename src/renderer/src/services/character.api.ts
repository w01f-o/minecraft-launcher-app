import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Character } from '../types/entities/Character.type';

export const characterApi = createApi({
  reducerPath: 'characterApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ['Character'],
  endpoints: builder => ({
    getCharacter: builder.query<Character, string>({
      query: (hwid: string) => `/characters/${hwid}`,
      providesTags: ['Character'],
    }),
    createCharacter: builder.mutation<Character, FormData>({
      query: (createDto: FormData) => ({
        url: `/characters`,
        method: 'POST',
        body: createDto,
      }),
      invalidatesTags: ['Character'],
    }),
    updateCharacter: builder.mutation<Character, FormData>({
      query: (updateOrCreateDto: FormData) => ({
        url: `/characters`,
        method: 'PATCH',
        body: updateOrCreateDto,
      }),
      invalidatesTags: ['Character'],
    }),
    deleteCape: builder.mutation<Character, string>({
      query: (hwid: string) => ({
        url: `/characters/cape/${hwid}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Character'],
    }),
  }),
});

export const {
  useGetCharacterQuery,
  useUpdateCharacterMutation,
  useDeleteCapeMutation,
} = characterApi;

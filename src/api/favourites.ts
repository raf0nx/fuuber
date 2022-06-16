import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { firebaseConfig } from 'config/config'
import { UpdateFavouritesData } from 'types/favourites-api'

export const favouritesApi = createApi({
  reducerPath: 'favouritesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${firebaseConfig.databaseURL}`,
  }),
  endpoints: build => ({
    getFavourites: build.query<string[] | null, string>({
      query: userId => ({
        url: `/favourites/${userId}.json`,
      }),
    }),
    updateFavourites: build.mutation<string[] | null, UpdateFavouritesData>({
      query: payload => ({
        url: `/favourites/${payload.userId}.json`,
        method: 'PUT',
        body: payload.favouritesIds,
      }),
    }),
  }),
})

export const { useLazyGetFavouritesQuery, useUpdateFavouritesMutation } =
  favouritesApi

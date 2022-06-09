import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { firebaseConfig } from 'config/config'
import { Food } from 'types/food'

export const foodApi = createApi({
  reducerPath: 'foodApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${firebaseConfig.databaseURL}`,
  }),
  endpoints: build => ({
    getFoods: build.query<Food[], void>({
      query: () => ({
        url: '/foods.json',
      }),
    }),
  }),
})

export const { useGetFoodsQuery } = foodApi

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { firebaseConfig } from 'config/config'
import { CartItem } from 'types/cart'
import { AddToCartData, CartUpdateData } from 'types/cart-api'

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${firebaseConfig.databaseURL}`,
  }),
  endpoints: build => ({
    getCart: build.query<CartItem[], string>({
      query: userId => ({
        url: `/cart/${userId}.json`,
      }),
    }),
    addToCart: build.mutation<CartItem, AddToCartData>({
      query: payload => ({
        url: `/cart/${payload.userId}/.json`,
        method: 'POST',
        body: payload.cartItem,
      }),
    }),
    // TODO: URL needs to be refactored
    updateCart: build.mutation<CartItem, CartUpdateData>({
      query: payload => ({
        url: `/cart/${payload.userId}/${payload.cartItemId}/amount.json`,
        method: 'PUT',
        body: payload.amount,
      }),
    }),
  }),
})

export const { useGetCartQuery, useAddToCartMutation, useUpdateCartMutation } =
  cartApi

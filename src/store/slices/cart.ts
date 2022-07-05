import { createSlice } from '@reduxjs/toolkit'

import { cartApi } from 'api/cart'
import { CartItem } from 'types/cart'

interface CartItems {
  cartItems: CartItem[]
}

const initialState: CartItems = {
  cartItems: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        cartApi.endpoints.getCart.matchFulfilled,
        (state, { payload }) => {
          state.cartItems = payload
        }
      )
      .addMatcher(
        cartApi.endpoints.addToCart.matchFulfilled,
        (state, { payload }) => {
          state.cartItems.push(payload)
        }
      )
      .addMatcher(
        cartApi.endpoints.updateCart.matchFulfilled,
        (state, { payload }) => {
          const cartItemToUpdateIdx = state.cartItems.findIndex(
            cartItem => cartItem.id === payload.id
          )

          state.cartItems[cartItemToUpdateIdx].amount = payload.amount
        }
      )
  },
})

export default cartSlice.reducer

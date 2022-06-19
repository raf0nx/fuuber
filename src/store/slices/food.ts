import { createSlice } from '@reduxjs/toolkit'

import { foodApi } from 'api/food'

import { Food } from 'types/food'

interface FavouritesIds {
  availableMeals: Food[] | null
}

const initialState: FavouritesIds = {
  availableMeals: null,
}

export const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      foodApi.endpoints.getFoods.matchFulfilled,
      (state, { payload }) => {
        state.availableMeals = payload
      }
    )
  },
})

export default foodSlice.reducer

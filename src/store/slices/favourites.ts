import { createSlice } from '@reduxjs/toolkit'

import { favouritesApi } from 'api/favourites'

interface FavouritesIds {
  favouritesIds: string[] | null
}

const initialState: FavouritesIds = {
  favouritesIds: null,
}

export const favouritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        favouritesApi.endpoints.getFavourites.matchFulfilled,
        (state, { payload }) => {
          state.favouritesIds = payload
        }
      )
      .addMatcher(
        favouritesApi.endpoints.updateFavourites.matchFulfilled,
        (state, { payload }) => {
          state.favouritesIds = payload
        }
      )
  },
})

export default favouritesSlice.reducer

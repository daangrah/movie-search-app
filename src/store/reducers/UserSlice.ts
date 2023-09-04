import { type IMovie } from '../../models/IUser'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface MovieState {
  movies: IMovie[]
  isLoading: boolean
  error: string
  length: number
  movieKey: string
}

const initialState: MovieState = {
  movies: [],
  isLoading: false,
  error: '',
  length: 0,
  movieKey: ''
}

const movieSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    movieFetching (state, action: PayloadAction) {
      state.isLoading = true
      console.log('load')
    },
    movieFetchingSuccess: function (state, action: PayloadAction) {
      state.isLoading = false
      state.error = ''
      state.movies = action.payload
    },
    seriesFetchingSuccess: function (state, action: PayloadAction) {
      state.isLoading = false
      state.error = ''
      state.movies = action.payload
    },
    movieVideoSucces: function (state, action: PayloadAction) {
      state.isLoading = false
      state.movieKey = action.payload
    },
    movieFetchingError (state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    }
  }
})
export const {
  movieFetching,
  movieFetchingSuccess,
  movieVideoSucces,
  seriesFetchingSuccess,
  movieFetchingError
} = movieSlice.actions

export default movieSlice.reducer

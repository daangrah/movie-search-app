import { type IMovie } from "../../models/IUser";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface MovieState {
  movies: IMovie[];
  isLoading: boolean;
  error: string;
  length: number;
  movieKey: string;
}

const initialMovieState: MovieState = {
  movies: [],
  isLoading: false,
  error: "",
  length: 0,
  movieKey: "",
};

const movieSlice = createSlice({
  name: "movie",
  initialState: initialMovieState,
  reducers: {
    movieFetching(state) {
      state.isLoading = true;
    },
    movieFetchingSuccess: function (state, action: PayloadAction) {
      state.isLoading = false;
      state.error = "";
      state.movies = action.payload;
    },
    movieVideoSuccess: function (state, action: PayloadAction) {
      state.isLoading = false;
      state.movieKey = action.payload;
    },
    movieFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { movieFetching, movieFetchingSuccess, movieVideoSuccess } =
  movieSlice.actions;

export default movieSlice.reducer;

import {IMovie} from "../../models/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface MovieState {
    movies: IMovie[];
    isLoading: boolean;
    error: string;
    length: number
}

const initialState: MovieState = {
    movies: [],
    isLoading: false,
    error: '',
    length: 0
}

const movieSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        movieFetching(state, action: PayloadAction){
            state.isLoading = true;
            console.log('load')
        },
        movieFetchingSuccess: function (state, action: PayloadAction<IMovie[]>) {
            state.isLoading = false;
            state.error = ''
            state.movies = action.payload;
        },
        movieFetchingError(state, action: PayloadAction<string>){
            state.isLoading = false
            state.error = action.payload
        },
    }
})
export const {movieFetching, movieFetchingSuccess, movieFetchingError} = movieSlice.actions

export default movieSlice.reducer;
import {AppDispatch} from "../store";
import {IMovie} from "../../models/IUser";
import axios from "axios";
import {movieFetching, movieFetchingSuccess} from "./UserSlice"


export const fetchMovieVideo = () => {
    return async (dispatch: AppDispatch) => {
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/movie/603692/videos',
            params: {language: 'en-US'},
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmMyMjA4ZWQ4ODk0OTIwMjY0ZDllNGM3OGZkNDhlYyIsInN1YiI6IjY0OWMzMzJlNzdjMDFmMDBjYTVhYTkxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KtN-jjPloqFEM021pITpc88QdOROqqtVOnTYz3qZbTA'
            }
        };
        axios
          .request(options)
          .then(function (response) {
              dispatch((movieFetchingSuccess(response.data.results)));
          })
          .then()
          .catch(function (error) {
              console.error(error);
          });
    }
}

export const fetchMovies = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(movieFetching)
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/trending/movie/day',
            params: {language: 'ru-RU'},
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmMyMjA4ZWQ4ODk0OTIwMjY0ZDllNGM3OGZkNDhlYyIsInN1YiI6IjY0OWMzMzJlNzdjMDFmMDBjYTVhYTkxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KtN-jjPloqFEM021pITpc88QdOROqqtVOnTYz3qZbTA'
            }
        };
        console.log(dispatch(movieFetching))
        axios
            .request(options)
            .then(function (response) {
                dispatch((movieFetchingSuccess(response.data.results)));
            })
            .catch(function (error) {
                console.error(error);
            });

    };
}
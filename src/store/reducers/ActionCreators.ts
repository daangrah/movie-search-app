import { type AppDispatch } from '../store';
import axios from 'axios';
import { takeEvery, call, all, put } from 'redux-saga/effects';
import { movieFetching, movieFetchingSuccess, movieVideoSuccess } from './UserSlice';
import {
  seriesFetching,
  seriesFetchingSuccess,
  seriesVideoFetching,
  seriesVideoSuccess,
} from './SeriesSlice';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmMyMjA4ZWQ4ODk0OTIwMjY0ZDllNGM3OGZkNDhlYyIsInN1YiI6IjY0OWMzMzJlNzdjMDFmMDBjYTVhYTkxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KtN-jjPloqFEM021pITpc88QdOROqqtVOnTYz3qZbTA',
  },
};
const fetchTopMoviesFromAPI = async () =>
  await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options).then(
    (response) => response.json(),
  );
const fetchTopSeriesFromAPI = async () =>
  await fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', options).then(
    (response) => response.json(),
  );

function* workerGetMovies() {
  console.log('popal');
  const data = yield call(fetchTopMoviesFromAPI);
  console.log(data.results);
  yield put({ type: movieFetchingSuccess, payload: data.results });
}
function* workerGetSeries() {
  const data = yield call(fetchTopSeriesFromAPI);
  console.log(data);
  yield put({ type: seriesFetchingSuccess, payload: data.results });
}

function* watcherClickSaga() {
  yield takeEvery(movieFetching, workerGetMovies);
  yield takeEvery(seriesFetching, workerGetSeries);
}
export function* rootSaga() {
  yield all([watcherClickSaga()]);
}

export const fetchMovieVideo = (id): any => {
  return async (dispatch: AppDispatch) => {
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${id}/videos`,
      params: { language: 'en-US' },
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmMyMjA4ZWQ4ODk0OTIwMjY0ZDllNGM3OGZkNDhlYyIsInN1YiI6IjY0OWMzMzJlNzdjMDFmMDBjYTVhYTkxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KtN-jjPloqFEM021pITpc88QdOROqqtVOnTYz3qZbTA',
      },
    };
    axios
      .request(options)
      .then(function (response) {
        dispatch(movieVideoSuccess(response.data.results[0].key));
      })
      .catch(function (error) {
        console.error(error);
      });
  };
};
export const fetchSeriesVideo = (id): any => {
  return async (dispatch: AppDispatch) => {
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`,
      params: { language: 'en-US' },
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmMyMjA4ZWQ4ODk0OTIwMjY0ZDllNGM3OGZkNDhlYyIsInN1YiI6IjY0OWMzMzJlNzdjMDFmMDBjYTVhYTkxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KtN-jjPloqFEM021pITpc88QdOROqqtVOnTYz3qZbTA',
      },
    };
    axios
      .request(options)
      .then(function (response) {
        dispatch(seriesVideoSuccess(response.data.results[0].key));
      })
      .catch(function (error) {
        console.error(error);
      });
  };
};

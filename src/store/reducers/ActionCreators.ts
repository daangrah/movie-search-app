import { type AppDispatch } from "../store";
import axios from "axios";
import { takeEvery, call, all, put } from "redux-saga/effects";
import {
  movieFetching,
  movieFetchingSuccess,
  movieVideoSuccess,
} from "./UserSlice";
import {
  seriesFetching,
  seriesFetchingSuccess,
  seriesVideoFetching,
  seriesVideoSuccess,
} from "./SeriesSlice";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmMyMjA4ZWQ4ODk0OTIwMjY0ZDllNGM3OGZkNDhlYyIsInN1YiI6IjY0OWMzMzJlNzdjMDFmMDBjYTVhYTkxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KtN-jjPloqFEM021pITpc88QdOROqqtVOnTYz3qZbTA",
  },
};
const fetchTopMoviesFromAPI = async () =>
  await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    options,
  );
const fetchTopSeriesFromAPI = async () =>
  await fetch(
    "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
    options,
  );
const fetchSeriesVideoFromAPI = async (TrueId) =>
  await fetch(
    `https://api.themoviedb.org/3/tv/${TrueId}/videos?language=en-US`,
    options,
  );
function* workerGetSeriesVideo(id) {
  console.log(id);
  const TrueId = id.payload;
  const data = yield call(fetchSeriesVideoFromAPI, TrueId);
  const json = yield call(() => new Promise((res) => res(data.json())));
  console.log(json);
  yield put({ type: seriesVideoSuccess, payload: json.results[0].key });
}
function* workerGetMovies() {
  console.log("popal");
  const data = yield call(fetchTopMoviesFromAPI);
  // console.log(data.json);
  const json = yield call(() => new Promise((res) => res(data.json())));
  console.log(json.results);
  yield put({ type: movieFetchingSuccess, payload: json.results });
}
function* workerGetSeries() {
  const data = yield call(fetchTopSeriesFromAPI);
  const json = yield call(() => new Promise((res) => res(data.json())));
  console.log(json);
  yield put({ type: seriesFetchingSuccess, payload: json.results });
}

function* watcherClickSaga() {
  yield takeEvery(movieFetching, workerGetMovies);
  yield takeEvery(seriesFetching, workerGetSeries);
  yield takeEvery(seriesVideoFetching, workerGetSeriesVideo);
}
export function* rootSaga() {
  yield all([watcherClickSaga()]);
}

export const fetchMovieVideo = (id) => {
  return async (dispatch: AppDispatch) => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}/videos`,
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmMyMjA4ZWQ4ODk0OTIwMjY0ZDllNGM3OGZkNDhlYyIsInN1YiI6IjY0OWMzMzJlNzdjMDFmMDBjYTVhYTkxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KtN-jjPloqFEM021pITpc88QdOROqqtVOnTYz3qZbTA",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        dispatch(movieVideoSuccess(response.data.results[0].key));
        console.log(response.data.results[0].key);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
};

// export const fetchMovies = () => {
//   return async (dispatch: AppDispatch) => {
//     dispatch(movieFetching());
//     const options = {
//       method: "GET",
//       url: "https://api.themoviedb.org/3/trending/movie/day",
//       params: { language: "en-US" },
//       headers: {
//         accept: "application/json",
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmMyMjA4ZWQ4ODk0OTIwMjY0ZDllNGM3OGZkNDhlYyIsInN1YiI6IjY0OWMzMzJlNzdjMDFmMDBjYTVhYTkxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KtN-jjPloqFEM021pITpc88QdOROqqtVOnTYz3qZbTA",
//       },
//     };
//     axios
//       .request(options)
//       .then(function (response) {
//         dispatch(movieFetchingSuccess(response.data.results));
//       })
//       .catch(function (error) {
//         console.error(error);
//       });
//   };
// };
// export const fetchSeries = () => {
//   return async (dispatch: AppDispatch) => {
//     dispatch(movieFetching());
//
//     const options = {
//       method: "GET",
//       url: "https://api.themoviedb.org/3/tv/top_rated",
//       params: { language: "en-US" },
//       headers: {
//         accept: "application/json",
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmMyMjA4ZWQ4ODk0OTIwMjY0ZDllNGM3OGZkNDhlYyIsInN1YiI6IjY0OWMzMzJlNzdjMDFmMDBjYTVhYTkxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KtN-jjPloqFEM021pITpc88QdOROqqtVOnTYz3qZbTA",
//       },
//     };
//
//     axios
//       .request(options)
//       .then(function (response) {
//         dispatch(seriesFetchingSuccess(response.data.results));
//         console.log("sosi jopu");
//       })
//       .catch(function (error) {
//         console.error(error);
//       });
//   };
// };

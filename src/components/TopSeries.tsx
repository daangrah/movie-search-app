import React, { useEffect, useState } from "react";
import "../App.css";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { Popup } from "./MoviePopUp/MoviePopUp";
import Loader from "./Loader";
import { fetchSeries } from "../store/reducers/ActionCreators";

const TopSeries = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSeries());
  }, []);
  const { movies, isLoading } = useAppSelector((state) => state.movieReducer);
  const [popupId, setPopupId] = useState<number | null>(null);

  const handleClosePopUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setPopupId(null);
  };

  return (
    <div>
      <h1>Most Popular Series Now</h1>
      {isLoading ? (
        <Loader />
      ) : movies.length > 0 ? (
        <div className="topMovies">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="movieCard"
              onClick={() => {
                setPopupId(movie.id);
              }}
            >
              <div className="rating">{movie.vote_average.toFixed(1)}</div>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt=""
              />
              <div>{movie.name}</div>
              <div>Year: {movie.first_air_date}</div>
              {popupId === movie.id && (
                <Popup closePopup={handleClosePopUp} movie={movie} />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>No Movies Found :(</div>
      )}
    </div>
  );
};

export default TopSeries;

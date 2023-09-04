import React, { useEffect, useState } from "react";
import "../App.css";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
// import { fetchMovies } from "../store/reducers/ActionCreators";
import { Popup } from "./MoviePopUp/MoviePopUp";
import Loader from "./Loader";
import { movieFetching } from "../store/reducers/UserSlice";

const Top250 = () => {
  const dispatch = useAppDispatch();
  const { movies, isLoading } = useAppSelector((state) => state.movieReducer);
  const [popupId, setPopupId] = useState<number | null>(null);
  useEffect(() => {
    console.log("opa");
    dispatch(movieFetching());
  }, []);
  const handleClosePopUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setPopupId(null);
  };

  return (
    <div>
      <h1>Most Popular Movies Now</h1>
      {isLoading ? (
        <Loader />
      ) : movies.length > 0 ? (
        <div className="topMovies">
          {movies.map(
            ({
              movie,
              id,
              vote_average,
              poster_path,
              title,
              release_date,
              overview,
            }) => (
              <div
                key={id}
                className="movieCard"
                onClick={() => {
                  setPopupId(id);
                }}
              >
                <div className="rating">{vote_average.toFixed(1)}</div>
                <img
                  src={`https://image.tmdb.org/t/p/w200${poster_path}`}
                  alt=""
                />
                <div>{title}</div>
                <div>Year: {release_date}</div>
                {popupId === id && (
                  <Popup
                    closePopup={handleClosePopUp}
                    movie={{
                      movie,
                      id,
                      vote_average,
                      poster_path,
                      title,
                      release_date,
                      overview,
                    }}
                  />
                )}
              </div>
            ),
          )}
        </div>
      ) : (
        <div>No Movies Found :(</div>
      )}
    </div>
  );
};

export default Top250;

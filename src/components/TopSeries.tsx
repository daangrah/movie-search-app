import React, { useEffect, useState } from "react";
import "../App.css";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { Popup } from "./MoviePopUp/MoviePopUp";
import Loader from "./Loader";
import { seriesFetching } from "../store/reducers/SeriesSlice";
import { PopupSeries } from "./MoviePopUp/SeriesPopUp";

const TopSeries = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(seriesFetching());
  }, []);
  const { series, isLoading } = useAppSelector((state) => state.seriesReducer);
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
      ) : series.length > 0 ? (
        <div className="topMovies">
          {series.map(
            ({
              series,
              id,
              vote_average,
              poster_path,
              name,
              first_air_date,
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
                <div>{name}</div>
                <div>Year: {first_air_date}</div>
                {popupId === id && (
                  <PopupSeries
                    closePopup={handleClosePopUp}
                    series={{
                      series,
                      id,
                      vote_average,
                      poster_path,
                      name,
                      first_air_date,
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

export default TopSeries;

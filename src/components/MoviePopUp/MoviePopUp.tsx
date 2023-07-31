import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import "./popup.css";
import close from "../../assets/close.png";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchMovieVideo } from "../../store/reducers/ActionCreators";

export const Popup = ({ closePopup, movie }) => {
  const dispatch = useAppDispatch();
  const { movieKey } = useAppSelector((state) => state.movieReducer);
  useEffect(() => {
    dispatch(fetchMovieVideo(movie.id));
  }, []);
  const url = `https://www.youtube.com/watch?v=${movieKey}`;
  return (
    <div className="popup-container">
      <div className="popup-body">
        <div className="close_img">
          <div onClick={closePopup}>
            <img src={close} alt="" />
          </div>
        </div>
        <div className="popup_padding">
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt=""
            className="popup_img"
          />
          <h1>{movie.title}</h1>
          <div>
            Release Date: {movie.release_date.slice(8, 10)}.
            {movie.release_date.slice(5, 7)}.{movie.release_date.slice(0, 4)}.
          </div>
          <p>Overview: {movie.overview}</p>
          <div className="video_container">
            <div className="video">
              <ReactPlayer url={url} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

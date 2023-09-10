import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import './popup.css';
import close from '../../assets/close.png';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { seriesVideoFetching } from '../../store/reducers/SeriesSlice';
import { fetchSeriesVideo } from '../../store/reducers/ActionCreators';

export const PopupSeries = ({ closePopup, series }: any) => {
  const dispatch = useAppDispatch();
  const { seriesKey } = useAppSelector((state) => state.seriesReducer);
  useEffect(() => {
    dispatch(fetchSeriesVideo(series.id));
  }, []);
  const url = `https://www.youtube.com/watch?v=${seriesKey}`;
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
            src={`https://image.tmdb.org/t/p/w300${series.poster_path}`}
            alt=""
            className="popup_img"
          />
          <h1>{series.title}</h1>
          <div>Release Date: {series.release_date}</div>
          <p>Overview: {series.overview}</p>
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

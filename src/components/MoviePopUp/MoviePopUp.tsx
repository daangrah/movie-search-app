import React from "react";
import "./popup.css";
// @ts-ignore
import close from "../../assets/close.png"
// @ts-ignore
export const Popup = ({ closePopup, movie }) => {
	return (
		<div className="popup-container">
			<div className="popup-body">
				<div className='close_img'>
					<div onClick={closePopup}>
					<img src={close} alt=''/>
					</div>
				</div>
				<div className="popup_padding">
				<img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="" className="popup_img"/>
				<h1>{movie.title}</h1>
				<div>Release Date: {movie.release_date.slice(8,10)}.{movie.release_date.slice(5,7)}.{movie.release_date.slice(0,4)}.</div>
				<p>Overview: {movie.overview}</p>
				</div>
			</div>
		</div>
	);
};
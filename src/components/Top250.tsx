import React, { useEffect, useState } from 'react'
import '../App.css'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchMovies } from '../store/reducers/ActionCreators'
import { Popup } from './MoviePopUp/MoviePopUp'
import Loader from './Loader'

const Top250 = () => {
  const dispatch = useAppDispatch()
  const { movies, isLoading } = useAppSelector(state => state.movieReducer)
  const [popupId, setPopupId] = useState<number | null>(null)
  useEffect(() => {
    dispatch(fetchMovies())
  }, [])
  const handleClosePopUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setPopupId(null)
  }

  return (
		<div>
			Most Popular Movies Now
				{isLoading
				  ? (<Loader />)
				  : (movies.length > 0)
				      ? (
						<div className='topMovies'>{movies.map(movie => (
							<div key={movie.id} className='movieCard' onClick={() => { setPopupId(movie.id) }}>
								<div className='rating'>{movie.vote_average.toFixed(1)}</div>
								<img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt=""/>
								<div>{movie.title}</div>
								<div>Year: {movie.release_date.slice(0, 4)}</div>
								{popupId === movie.id && <Popup closePopup={handleClosePopUp} movie={movie} />}
							</div>
				      ))}
							</div>
				  )
				      : (
						<div>No Movies Found :(</div>
				  )}
		</div>
  )
}

export default Top250

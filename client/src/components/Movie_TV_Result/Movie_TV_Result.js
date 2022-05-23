import React from 'react';
import './Movie_TV_Result.styles.scss';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { BASE_IMAGE_URL, API_KEY } from "../../API/API";
import { displayMovieData, displayMovieImages } from "../../store/movies/moviesReducer";

const Movie_TV_Result = ({ movie }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const movieTVClickHandler = async () => {
    let tvOrMovie = await movie?.original_name ? 'tv' : 'movie';
    fetch(`https://api.themoviedb.org/3/${tvOrMovie}/${movie?.id}?${API_KEY}`)
      .then(res => res.json())
      .then(data => dispatch(displayMovieData(data)))
      .catch(err => console.error(err));
    fetch(`https://api.themoviedb.org/3/${tvOrMovie}/${movie?.id}/images?${API_KEY}`)
      .then(res => res.json())
      .then(data => dispatch(displayMovieImages(data)))
      .catch(err => console.error(err));
  };

  return (
    <div className='movie_tv-wrapper' onClick={() => {
      navigate(`/detail:${movie?.id}`);
      return movieTVClickHandler();
    }}>
      <img className="movie-image" src={`${BASE_IMAGE_URL}${movie?.poster_path}`} />
      <div className="movie-info-container">
        <h4 className="movie-title">{movie?.original_name ? movie?.original_name : movie?.original_title}</h4>
        <p className="movie-overview">{movie?.overview?.length > 350 ? `${movie?.overview?.substring(0, 350)}...` : movie?.overview}</p>
      </div>
    </div>
  )
}

export default Movie_TV_Result;
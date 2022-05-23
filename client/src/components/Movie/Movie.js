import React from "react";
import './Movie.styles.scss';
import { useDispatch } from "react-redux";
import { BASE_IMAGE_URL, API_KEY } from "../../API/API";
import { displayMovieData, displayMovieImages } from "../../store/movies/moviesReducer";
import { useNavigate } from 'react-router-dom';

const Movie = ({ movie, backdrop }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const movieClickHandler = () => {
    fetch(`https://api.themoviedb.org/3/movie/${movie.id}?${API_KEY}`)
      .then(res => res.json())
      .then(data => dispatch(displayMovieData(data)))
      .catch(err => console.error(err));
    fetch(`https://api.themoviedb.org/3/movie/${movie.id}/images?${API_KEY}`)
      .then(res => res.json())
      .then(data => dispatch(displayMovieImages(data)))
      .catch(err => console.error(err));
  };

  return (
    <div className="movie-wrapper" onClick={() => {
      navigate(`/detail:${movie.id}`);
      return movieClickHandler();
    }}>
      <img className="movie-image" src={`${BASE_IMAGE_URL}${backdrop ? movie?.backdrop_path : movie?.poster_path}`} />
      <div className="movie-info-container">
        <h4 className="movie-title">{movie?.title}</h4>
        <p className="movie-overview">{movie?.overview.length > 280 ? `${movie?.overview?.substring(0, 280)}...` : movie.overview}</p>
      </div>
    </div>
  );
};

export default Movie;

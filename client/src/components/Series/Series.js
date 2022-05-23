import React from "react";
import './Series.styles.scss';
import { useDispatch } from "react-redux";
import { BASE_IMAGE_URL, API_KEY } from "../../API/API";
import { displayMovieData, displayMovieImages } from "../../store/movies/moviesReducer";
import { useNavigate } from 'react-router-dom';

const Series = ({ movie, backdrop }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const seriesClickHandler = () => {
    fetch(`https://api.themoviedb.org/3/tv/${movie.id}?${API_KEY}`)
      .then(res => res.json())
      .then(data => dispatch(displayMovieData(data)))
      .catch(err => console.error(err));
    fetch(`https://api.themoviedb.org/3/tv/${movie.id}/images?${API_KEY}`)
      .then(res => res.json())
      .then(data => dispatch(displayMovieImages(data)))
      .catch(err => console.error(err));
  };

  return (
    <div className="series-wrapper" onClick={() => {
      navigate(`/detail:${movie.id}`);
      return seriesClickHandler();
    }}>
      <img className="series-image" src={`${BASE_IMAGE_URL}${backdrop ? movie?.backdrop_path : movie?.poster_path}`} />
      <div className="series-info-container">
        <h4 className="series-title">{movie?.original_name}</h4>
        <p className="series-overview">{movie?.overview.length > 280 ? `${movie?.overview?.substring(0, 280)}...` : movie.overview}</p>
      </div>
    </div>
  );
};

export default Series;

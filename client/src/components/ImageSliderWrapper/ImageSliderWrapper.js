import React from "react";
import "./ImageSliderWrapper.styles.scss";
import { BASE_IMAGE_URL_WIDE, API_KEY } from "../../API/API";
import { displayMovieData, displayMovieImages } from "../../store/movies/moviesReducer";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ImageSliderWrapper = ({ movie }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div className="image-wrapper" onClick={() => {
      navigate(`/detail:${movie.id}`);
      return movieClickHandler();
    }}>
      <img
        className="image-slider-image"
        src={`${BASE_IMAGE_URL_WIDE}${movie.backdrop_path}`}
      />
      <div className="image-wrapper-info">
        <h4 className="image-wrapper-title">{movie.original_title}</h4>
        <p className="image-wrapper-overview">{movie.overview.length > 300 ? `${movie.overview.substring(0, 300)}...` : movie.overview}</p>
      </div>
    </div>
  );
};

export default ImageSliderWrapper;

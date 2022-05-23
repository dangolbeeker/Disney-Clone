import React, { useEffect, useState } from 'react';
import './Movies.styles.scss';
import Movie from '../Movie/Movie';
import { useSelector, useDispatch } from 'react-redux';
import { popularMovies } from '../../store/movies/moviesReducer';
import { API_KEY, BASE_URL, MOVIES, BY_POPULARITY, WITHOUT_COMPANIES, } from '../../API/API';
import { fetchFunction } from '../../API/fetchFunction';

const Movies = () => {
  const [PAGE_NUMBER, SET_PAGE_NUMBER] = useState(1);
  let PAGE = `&page=${PAGE_NUMBER}`;
  const dispatch = useDispatch();
  
  useEffect(() => {
    fetchFunction(`${BASE_URL}${MOVIES}${API_KEY}${BY_POPULARITY}${PAGE}${WITHOUT_COMPANIES}`, dispatch, popularMovies);
  }, []);
  
  const popularMoviesSelector = useSelector(state => state?.movies?.popularMovies);

  return (
    <div className='movies-container'>

      <h3>Recommended for You</h3>
      <div className='movies-content'>
        {popularMoviesSelector
          ?.filter((movie, index) => 8 <= index && index <= 11)
          ?.map((movie) => <Movie key={movie.id} movie={movie} backdrop />)}
      </div>

      <h3>Popular</h3>
      <div className='movies-content'>
        {popularMoviesSelector
          ?.filter((movie, index) => 11 < index && index <= 15)
          ?.map((movie) => <Movie key={movie.id} movie={movie} backdrop />)}
      </div>

      <h3>Trending</h3>
      <div className='movies-content'>
        {popularMoviesSelector
          ?.filter((movie, index) => 15 < index && index <= 20)
          ?.map((movie) => <Movie key={movie.id} movie={movie} backdrop />)}
      </div>
    </div>
  )
}

export default Movies;
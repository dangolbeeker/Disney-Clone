import React, { useState, useEffect } from 'react';
import './MoviesPage.styles.scss';
import { API_KEY } from '../../API/API';
import Movie from '../Movie/Movie';

const MoviesPage = () => {
  const [results, setResults] = useState([]);
  const lastYear = new Date().getFullYear() - 1;
  const query = `https://api.themoviedb.org/3/discover/movie?${API_KEY}sort_by=popularity.desc&page=2&with_original_language=en&vote_average.gte=7&primary_release_date.gte=${lastYear}`;

  useEffect(() => {
    fetch(query)
      .then(res => res.json())
      .then(data => setResults(data.results))
      .catch(err => console.error(err));
  }, [])
  
  // console.log(results);
  return (
    <div className='movies-page-container'>
      <h2 className='movies-page-title'>Popular Movies</h2>
      <div className='movies-content-wrapper'>
        {results?.map(item => <Movie key={item.id} movie={item} />)}
      </div>
    </div>
  )
}

export default MoviesPage;
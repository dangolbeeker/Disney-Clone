import React, { useState, useEffect } from 'react';
import './SeriesPage.styles.scss';
import { API_KEY } from '../../API/API';
import Series from '../Series/Series';

const SeriesPage = () => {
  const [results, setResults] = useState([]);
  const lastYear = new Date().getFullYear() - 1;
  const query = `https://api.themoviedb.org/3/discover/tv?${API_KEY}sort_by=popularity.desc&page=1&with_original_language=en&vote_average.gte=7.6&air_date.gte=${lastYear}`;

  useEffect(() => {
    fetch(query)
      .then(res => res.json())
      .then(data => setResults(data.results))
      .catch(err => console.error(err));
  }, [])
  
  // console.log(results);
  return (
    <div className='series-page-container'>
      <h2 className='series-page-title'>Popular Series</h2>
      <div className='series-content-wrapper'>
        {results?.map(item => <Series key={item.id} movie={item} />)}
      </div>
    </div>
  )
}

export default SeriesPage;
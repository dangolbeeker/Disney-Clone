import React, { useState, useEffect, useRef } from 'react';
import './Search.styles.scss';
import { API_KEY } from '../../API/API';
import Movie_TV_Result from '../Movie_TV_Result/Movie_TV_Result';

const Search = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const searchInput = useRef(null);

  // Query for fetching movie or TV show data
  let query = `https://api.themoviedb.org/3/search/multi?${API_KEY}language=en-US&query=${search}&page=1&include_adult=false`;

  // Handle fetching data based on search
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (search.length === 0) return;
    await fetch(query)
      .then(res => res.json())
      .then(data => {
        setResults(data?.results.filter((el, i) => el?.media_type !== "person").filter((el, i) => el?.backdrop_path !== null));
        localStorage.setItem('searchResults', JSON.stringify(data?.results.filter((el, i) => el?.media_type !== "person").filter((el, i) => el?.backdrop_path !== null)));
        return data;
      })
      .catch(err => console.error(err));

    localStorage.setItem('searchTerm', search);
    return setSearch('');
  };

  // Store search results in local storage, allowing search to persist when coming back to search page
  useEffect(() => {
    searchInput.current.focus();
    const searchResults = localStorage.getItem('searchResults');
    if (searchResults === null || searchResults === undefined || searchResults === '') {return;}
    if (searchResults) {setResults(JSON.parse(searchResults));}
  }, []);
  

  // console.log(results);
  return (
    <div className='search-page-container'>
      <form onSubmit={handleSubmit} className='search-form'>
        <input ref={searchInput} className='search-input' id='search' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search for Movies, or TV Shows' />
        <img className='clear-search-button' src='images/clear-search.png' onClick={() => {
          setResults([]);
          searchInput.current.focus();
          return localStorage.setItem('searchResults', '');
        }} />
      </form>

      <div className='search-results-container'>
        {results?.map(movie => <Movie_TV_Result key={movie?.id} movie={movie} />)}
      </div>
    </div>
  )
}

export default Search;
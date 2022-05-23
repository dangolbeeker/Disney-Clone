import React, { useState, useEffect } from 'react';
import './Showcase.styles.scss';
import { useSelector } from 'react-redux';
import { API_KEY } from '../../API/API';
import Movie_TV_Result from '../Movie_TV_Result/Movie_TV_Result';

const Showcase = () => {
  const currentShowcase = useSelector(state => state.showCase.showCase);
  const [showCaseMovies, setShowCaseMovies] = useState([]);

  let companyID;
  let imageSrc;
  let videoSrc;
  let videoClass = '';
  let genres = '';
  if (currentShowcase === 'disney') {companyID = '2'; imageSrc = 'images/viewers-disney.png'; videoSrc = 'videos/disney-intro.mp4'; videoClass = 'disneyBG';}
  if (currentShowcase === 'pixar') {companyID = '3'; imageSrc = 'images/viewers-pixar.png'; videoSrc = 'videos/pixar-intro.mp4'; videoClass = 'pixarBG';}
  if (currentShowcase === 'marvel') {companyID = '420'; imageSrc = 'images/viewers-marvel.png'; videoSrc = 'videos/marvel-intro.mp4'; videoClass = 'marvelBG';}
  if (currentShowcase === 'star-wars') {companyID = '1'; imageSrc = 'images/viewers-starwars.png'; videoSrc = 'videos/star-wars-intro.mp4'; videoClass = 'starwarsBG'; genres = '&with_genres=878'}
  if (currentShowcase === 'national-geographic') {companyID = '7521'; imageSrc = 'images/viewers-national.png'; videoSrc = 'videos/national-intro.mp4'; videoClass = 'nationalBG';}
  if (currentShowcase === 'star') {companyID = '25'; imageSrc = 'images/viewers-star.png'; videoSrc = 'videos/fox-intro.mp4'; videoClass = 'foxBG';}
  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/discover/movie?${API_KEY}language=en-US&sort_by=popularity.desc&include_adult=false&vote_average.gte=6&page=1&with_companies=${companyID}${genres}`)
      .then(res => res.json())
      .then(data => setShowCaseMovies(data?.results))
      .catch(err => console.error(err));
  }, [])
  
  return (
    <div className='showcase-page-container'>
      <div className={`showcase-bg ${videoClass}`}>
        <video className='bg-video' autoPlay muted loop playsInline>
          <source src={videoSrc} />
        </video>
      </div>

      <div className='showcase-movies'>
        {showCaseMovies.map(movie => <Movie_TV_Result key={movie.id} movie={movie} />)}
      </div>
    </div>
  )
}

export default Showcase;
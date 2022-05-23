import React, { useEffect, useRef, useState } from 'react';
import './Detail.styles.scss';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BASE_IMAGE_URL_WIDE, API_KEY } from '../../API/API';
import { addToWatchlist, updateLocalStorageUser } from '../../store/user/userReducer';

const Detail = () => {
  const trailersRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [movieTrailers, setMovieTrailers] = useState([]);
  const movieState = useSelector(state => state.movies);
  const { displayMovieData: movieData, displayMovieImages: movieImages } = movieState;
  // console.log(movieData, movieImages);

  
  // Grab the first English logo, if no logo is available then use disney+ logo
  let firstEnglishLogo = movieImages?.logos?.find(logo => logo?.iso_639_1 === 'en');
  let logoPath = `${BASE_IMAGE_URL_WIDE + firstEnglishLogo?.file_path}`;
  if (firstEnglishLogo?.file_path == undefined) logoPath = 'images/disney-plus-logo.png';

  // Grab the first English Poster
  let firstEnglishPoster = movieImages?.posters?.find(poster => poster?.iso_639_1 === 'en');
  let posterPath = `${BASE_IMAGE_URL_WIDE + firstEnglishPoster?.file_path}`;
  
  // Calculate movie runtime
  const convertedMovieRunTime = (inputTime) => {
    
    if (inputTime === undefined || inputTime === null) {
      return;
    }

    let hours = Math.floor(inputTime / 60);
    let minutes = inputTime % 60;
    return `${hours}h ${minutes}m`;
  };
  
  // Generate array of genres to join with commas
  let genresArray = [];
  movieData?.genres?.forEach(genre => {
    genresArray.push(genre?.name);
  });
  
  // Fetch trailers for specific movie or tv show
  let tvOrMovie = movieData?.original_name ? 'tv' : 'movie';

  // If screen size is iPad Pro or smaller, use poster as BG, instead of backdrop
  const windowWidth = window.innerWidth;
  const bgImage = windowWidth > 1024 ? `${BASE_IMAGE_URL_WIDE}${movieImages?.backdrops?.[0]?.file_path}` : posterPath;
  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`https://api.themoviedb.org/3/${tvOrMovie}/${movieData?.id}/videos?${API_KEY}language=en-US`)
    .then(res => res.json())
    .then(data => setMovieTrailers(data?.results?.reverse()))
    .catch(err => console.error(err));
  }, [movieData?.id]);


  return (
    <div className='details-container'>

      <div className='details-background-container'>
        <img className='details-background-image' src={bgImage} />
      </div>

      <div className='details-content'>
        <div className='details-image-title-container'>
          <img className='details-image-title' src={logoPath} />
          <span className='go-back-button' onClick={() => window.history.back()}>{`❮ Go Back`}</span>
        </div>


        <div className='controls-container'>

          <button className='play-button controls-button'>
            <img src='images/play-icon-black.png' />
            <span>Play</span>
          </button>

          <button className='trailer-button controls-button' onClick={() => trailersRef.current.scrollIntoView()}>
            {/* <img src='images/play-icon-white.png' /> */}
            <span>Trailer</span>
          </button>

          <button className='add-button controls-button' title='Add to Watchlist' onClick={() => {
            dispatch(addToWatchlist(movieData));
            return dispatch(updateLocalStorageUser());
          }}>
            <span>+</span>
          </button>

          <button className='group-watch-button controls-button'>
            <img src='images/group-icon.png' />
          </button>

        </div>

        <div className='details-subtitle-container'>
          <h4 className='details-subtitle'>
            {tvOrMovie === 'tv' ? `${movieData?.first_air_date?.split('-')[0]} - ${movieData?.last_air_date?.split('-')[0]}` : movieData?.release_date?.split('-')[0]} • {tvOrMovie === 'tv' ? `${movieData?.number_of_seasons} ${movieData?.number_of_seasons > 1 ? 'Seasons' : 'Season'}` : convertedMovieRunTime(movieData?.runtime)} • {genresArray?.join(', ')}
          </h4>
        </div>

        <div className='details-description-container'>
          <p className='details-tagline'>
            {movieData?.tagline}
          </p>
          <p className='details-description'>
            {movieData?.overview}
          </p>
        </div>


        <div className='trailers-container' ref={trailersRef}>
          <h4 className='trailers-title'>Trailers</h4>
          <hr />
          <div className='trailers-content'>
            {movieTrailers
              ?.filter((el, i) => i <= 5)
              .map(trailer => <iframe key={trailer?.id} src={`https://www.youtube.com/embed/${trailer?.key}`} allow="fullscreen;"></iframe>)}
          </div>
        </div>

      </div>

    </div>
  )
}

export default Detail;
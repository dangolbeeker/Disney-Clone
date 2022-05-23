import React from 'react';
import './Watchlist.styles.scss';
import { useSelector, useDispatch } from 'react-redux';
import { BASE_IMAGE_URL_WIDE } from '../../API/API';
import Movie_TV_Result from '../Movie_TV_Result/Movie_TV_Result';
import { removeFromWatchlist, updateLocalStorageUser } from '../../store/user/userReducer';

const Watchlist = () => {
  const { watchlist } = useSelector(state => state.user);
  const dispatch = useDispatch();
  // console.log(watchlist);

  return (
    <div className='watchlist-page-container'>
      <h2 className='watchlist-title'>{watchlist.length > 0 ? 'Your Watchlist' : 'Your Watchlist Is Empty!'}</h2>
      <div className='watchlist-content'>
        {watchlist.map(item => (
          <div className='watchlist-movie-wrapper' key={item.id}>
            <div className='remove-watchlist-item' onClick={() => {
              dispatch(removeFromWatchlist(item));
              return dispatch(updateLocalStorageUser());
            }}>
              <img className='remove-watchlist-item-button' src='images/clear-search.png' />
            </div>
            <Movie_TV_Result movie={item} src={`${BASE_IMAGE_URL_WIDE}${item.poster_path}`} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Watchlist;
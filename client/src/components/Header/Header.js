import React, { useState } from 'react';
import './Header.styles.scss';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logUserIn, logUserOut, updateLocalStorageUser, } from '../../store/user/userReducer';

const Header = () => {
  const navigate = useNavigate(); // navigate between pages
  const dispatch = useDispatch(); // redux dispatch method
  const user = useSelector(state => state.user); // grab user from redux store
  const [toggleLogout, setToggleLogout] = useState(false);

  return (
    <nav className={`header-container ${user.loggedIn ? 'justify-center' : 'justify-space-between'}`}>
      <img className='header-logo' src='images/logo.svg'  alt='disney-logo' />

      {user.loggedIn ? (<div className='header-menu'>
        <Link to='/home' className='header-menu-link'>
          <img src='images/home-icon.svg' alt='home-icon'/>
          <span>home</span>
        </Link>
        <Link to='/search' className='header-menu-link'>
          <img src='images/search-icon.svg' alt='search-icon'/>
          <span>search</span>
        </Link>
        <Link to='/watchlist' className='header-menu-link'>
          <img src='images/watchlist-icon.svg' alt='watchlist-icon'/>
          <span>watchlist</span>
        </Link>
        {/* <Link to='/originals' className='header-menu-link'>
          <img src='images/original-icon.svg' alt='originals-icon'/>
          <span>originals</span>
        </Link> */}
        <Link to='/movies' className='header-menu-link'>
          <img src='images/movie-icon.svg' alt='movie-icon'/>
          <span>movies</span>
        </Link>
        <Link to='/series' className='header-menu-link'>
          <img src='images/series-icon.svg' alt='series-icon'/>
          <span>series</span>
        </Link>
      </div>) : null}
      
      {user.loggedIn ? (
        <div className='header-user-image-container' onClick={() => setToggleLogout(!toggleLogout)}>
          <img className="header-user-image" src={user.userImage} />
        </div>
      ) : (
        <button className="login-button" onClick={() => {dispatch(logUserIn()); dispatch(updateLocalStorageUser()); return navigate('/home');}}>Login</button>
      )}

      {toggleLogout ? (
      <div className='logout-modal'>
        <h4>{user.userName}</h4>
        <button className='modal-button' onClick={() => {navigate('/settings'); return setToggleLogout(!toggleLogout)}}>Settings</button>
        <button className='modal-button' onClick={() => {
          dispatch(logUserOut()); 
          navigate('/'); 
          dispatch(updateLocalStorageUser());
          return setToggleLogout(!toggleLogout)}}
        >
          Log Out
        </button>
      </div>
      ) : null}
    </nav>
  )
}

export default Header;
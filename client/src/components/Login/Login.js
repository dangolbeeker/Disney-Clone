import React, { useEffect } from 'react';
import './Login.styles.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, } from 'react-redux';
import { logUserIn, updateLocalStorageUser } from '../../store/user/userReducer';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // On page load push user to home page if they were loggedIn previously
  useEffect(() => {
    const currentLocalStorageUser = JSON.parse(localStorage.getItem('currentDisneyCloneUser'));

    if (currentLocalStorageUser === null || currentLocalStorageUser === undefined) {
      return;
    }

    if (currentLocalStorageUser.loggedIn === true) {
      navigate('/home');
    }
  }, []);

  
  return (
    <div className='login-page-container'>
      <div className='login-content-cta'>
        <img src='images/cta-logo-one.svg' className='login-logo-1 login-logo' /> 
        <div className='sign-up'>
          <button>Subscribe to Disney+</button>
          <button className='guest-login-button' onClick={() => {dispatch(logUserIn()); dispatch(updateLocalStorageUser()); return navigate('/home')}}>or login as guest</button>
          <p className='sign-up-description'>
            Get Premier Access to Raya and the Last Dragon for an additional fee with a Disney+ subscription. 
            As of 03/26/21, the price of Disney+ and The Disney Bundle will increase by $1.
          </p>
        </div>
        <img src='images/cta-logo-two.png' className='login-logo-2 login-logo' />
      </div>
    </div>
  )
}

export default Login;
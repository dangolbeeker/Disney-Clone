import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logUserIn } from './store/user/userReducer';
import './App.scss';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Header_Mobile from './components/Header_Mobile/Header_Mobile';
import Login from './components/Login/Login';
import Home from './components/HomePage/Home';
import Search from './components/SearchPage/Search';
import Watchlist from './components/WatchlistPage/Watchlist';
import Detail from './components/Detail/Detail';
import Settings from './components/SettingsPage/Settings';
import Showcase from './components/Showcase/Showcase';
import OriginalsPage from './components/OriginalsPage/OriginalsPage';
import MoviesPage from './components/MoviesPage/MoviesPage';
import SeriesPage from './components/SeriesPage/SeriesPage';
import ErrorPage from './components/Error/ErrorPage';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const userState = useSelector(state => state.user);
  
  useEffect(() => {
    if (localStorage.getItem('currentDisneyCloneUser') === null || localStorage.getItem('currentDisneyCloneUser') === undefined) {
      return navigate('/');
    }
    const userLocalStorageData = JSON.parse(localStorage.getItem('currentDisneyCloneUser'));

    // If user is logged in then keep them logged in on page refresh
    if (userLocalStorageData.loggedIn) {
      dispatch(logUserIn());
    }

    // If user not logged in keep redirecting them to login page
    if (userLocalStorageData.loggedIn == false) {
      navigate('/');
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/detail:id' element={<Detail />} />
        <Route path='/watchlist' element={<Watchlist />} />
        <Route path='/showcase' element={<Showcase />} />
        <Route path='/originals' element={<OriginalsPage />} />
        <Route path='/movies' element={<MoviesPage />} />
        <Route path='/series' element={<SeriesPage />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <Header_Mobile />
    </div>
  );
}

export default App;
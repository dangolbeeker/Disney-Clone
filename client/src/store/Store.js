import { configureStore } from '@reduxjs/toolkit'
import userReducer from './User/UserReducer';
import moviesReducer from './Movies/MoviesReducer';
import ShowcaseReducer from './Showcase/ShowcaseReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    showCase: ShowcaseReducer,
  }
});

export default store;
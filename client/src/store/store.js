import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/UserReducer';
import moviesReducer from './movies/MoviesReducer';
import showcaseReducer from './showcase/ShowcaseReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    showCase: showcaseReducer,
  }
});

export default store;
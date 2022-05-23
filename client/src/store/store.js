import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userReducer';
import moviesReducer from './movies/moviesReducer';
import showcaseReducer from './showcase/showcaseReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    showCase: showcaseReducer,
  }
});

export default store;
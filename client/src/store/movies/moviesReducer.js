import { createSlice } from "@reduxjs/toolkit";

export const moviesSlice = createSlice({
  name: "Movies",
  initialState: [],
  reducers: {
    popularMovies: (state, action) => {
      return {...state, popularMovies: action.payload};
    },
    displayMovieData: (state, action) => {
      return {...state, displayMovieData: action.payload}
    },
    displayMovieImages: (state, action) => {
      return {...state, displayMovieImages: action.payload}
    },
  }
});

export const { popularMovies, displayMovieData, displayMovieImages } = moviesSlice.actions;
export default moviesSlice.reducer;


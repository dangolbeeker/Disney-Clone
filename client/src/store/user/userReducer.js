import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "User",
  initialState: { userName: `Guest#${Math.floor(Math.random() * 200)}`, userImage: 'images/astronaut.png', watchlist: [], loggedIn: false },
  reducers: {
    logUserIn: (state, action) => {
      if (localStorage.getItem('currentDisneyCloneUser') === null) {
        localStorage.setItem('currentDisneyCloneUser', JSON.stringify({...state, loggedIn: true}));
        return {...state, loggedIn: true}
      }

      const { userName, userImage, watchlist } = JSON.parse(localStorage.getItem('currentDisneyCloneUser'));
      return {...state, userName, userImage, watchlist, loggedIn: true};
    },
    logUserOut: (state, action) => {
      return {...state, loggedIn: false};
    },
    updateUserName: (state, action) => {
      return {...state, userName: action.payload};
    },
    updateUserImage: (state, action) => {
      return {...state, userImage: action.payload};
    },
    updateLocalStorageUser: (state, action) => {
      const { loggedIn, userName, watchlist, userImage } = state;
      return localStorage.setItem('currentDisneyCloneUser', JSON.stringify({ userName, userImage, watchlist, loggedIn,}));
    },
    addToWatchlist: (state, action) => {
      const existingItem = state.watchlist.find(item => item.id === action.payload.id);
      if (!existingItem) return {...state, watchlist: [...state.watchlist, action.payload]};
      return {...state, watchlist: [...state.watchlist]};
    },
    removeFromWatchlist: (state, action) => {
      const existingItem = state.watchlist.find(item => item.id === action.payload.id);
      
      if (!existingItem) return {...state};
      return {...state, watchlist: [...state.watchlist.filter(item => item.id !== action.payload.id)]};
    },
  }
});




export const { logUserIn, logUserOut, updateUserName, updateUserImage, updateLocalStorageUser, addToWatchlist, removeFromWatchlist } = userSlice.actions;
export default userSlice.reducer;
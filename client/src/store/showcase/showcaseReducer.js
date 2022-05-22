import { createSlice } from "@reduxjs/toolkit";


export const showcaseSlice = createSlice({
    name: "Showcase",
    initialState: { showCase: ''},
    reducers: {
        updateShowcase: (state, action) => {
            return {...state, showCase: action.payload};
        },
    }
        });
    export const { updateShowcase, } = showcaseSlice.actions;
    export default showcaseSlice.reducer
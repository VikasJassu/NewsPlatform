import { createSlice } from "@reduxjs/toolkit";

export const saveNewsSlice = createSlice({
    name:"saved",
    initialState:[],
    reducers: {
       add:(state,action) => {
        state.push(action.payload);
       },
       remove: (state,action) => {
        return state.filter((item) => item.id !== action.payload);
       },

    }
});

export const{add, remove} = saveNewsSlice.actions;
export default saveNewsSlice.reducer;
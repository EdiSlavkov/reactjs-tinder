import { createSlice } from '@reduxjs/toolkit'

const initialState = false;

export const detailedInfoSlice = createSlice({
  name: 'detailedInfo',
  initialState,
  reducers: {
    reveal : (state)=>{
       return state = true;
    },
    hide : (state)=>{
     return state = false;
    }
  }
})

// Action creators are generated for each case reducer function
export const { reveal, hide } = detailedInfoSlice.actions

export default detailedInfoSlice.reducer
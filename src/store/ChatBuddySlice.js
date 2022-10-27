import { createSlice } from '@reduxjs/toolkit'

const initialState = {};

export const chatBuddySlice = createSlice({
  name: 'chatBuddy',
  initialState,
  reducers: {
    //updates the loggedUser and all registered users in local storage
    setChatBuddy: (state, action)=>{
        const obj = action.payload;
        state = obj
        return obj;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setChatBuddy } = chatBuddySlice.actions

export default chatBuddySlice.reducer
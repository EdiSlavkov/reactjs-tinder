import { createSlice } from '@reduxjs/toolkit'

const initialState = {};

export const chatBuddySlice = createSlice({
  name: 'chatBuddy',
  initialState,
  reducers: {
    //updates the loggedUser and all registered users in local storage
    setChatBuddy: (state, action)=>{
        state = action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setChatBuddy } = chatBuddySlice.actions

export default chatBuddySlice.reducer
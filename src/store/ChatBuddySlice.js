import { createSlice } from '@reduxjs/toolkit'

const initialState = {};

export const chatBuddySlice = createSlice({
  name: 'chatBuddy',
  initialState,
  reducers: {
    setChatBuddy: (state, action)=>action.payload,
  }
})

export const { setChatBuddy } = chatBuddySlice.actions

export default chatBuddySlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import {  getLoggedUser, updateBuddyChat, updateData } from '../server/server';

const initialState = getLoggedUser();

export const activeUserSlice = createSlice({
  name: 'activeUser',
  initialState,
  reducers: {
    //updates the loggedUser and all registered users in local storage

    changeUserData: (state) => {
      updateData(state);

    },
    updateChat : (state, action)=>{
      const [buddy, newChat] = action.payload;
      const index = state.chats.findIndex(chat => chat.chatBuddy === buddy.email);
      state.chats.splice(index, 1, newChat);
      updateBuddyChat(buddy, newChat);
      updateData(state);
      
    
    },
    temporaryData : (state, action) => {
      const [key, value] = action.payload;
      return {
        ...state,
        [key]:value
      }
  },
  update: (state, action)=>{
    const obj = action.payload;
    return obj;
  }
  }
})

// Action creators are generated for each case reducer function
export const { changeUserData, temporaryData, update, updateChat } = activeUserSlice.actions

export default activeUserSlice.reducer
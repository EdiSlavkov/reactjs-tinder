import { configureStore } from '@reduxjs/toolkit'
import activeUserReducer from './ActiveUserSlice'
import chatToggleReducer from './ChatToggleSlice'
import chatBuddyReducer from "./ChatBuddySlice"

export const store = configureStore({
  reducer: {
    activeUser:  activeUserReducer,
    activeChat: chatToggleReducer,
    chatBuddy: chatBuddyReducer,
  },
})
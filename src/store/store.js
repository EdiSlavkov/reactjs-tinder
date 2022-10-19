import { configureStore } from '@reduxjs/toolkit'
import activeUserReducer from './ActiveUserSlice'
import chatToggleReducer from './ChatToggleSlice'

export const store = configureStore({
  reducer: {
    activeUser:  activeUserReducer,
    activeChat: chatToggleReducer
  },
})
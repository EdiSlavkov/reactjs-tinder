import { configureStore } from '@reduxjs/toolkit'
import activeUserReducer from './ActiveUserSlice'
import chatToggleReducer from './ChatToggleSlice'
import detailedInfoReducer from './DetailedInfoSlice'

export const store = configureStore({
  reducer: {
    activeUser:  activeUserReducer,
    activeChat: chatToggleReducer,
    detailedInfo : detailedInfoReducer
  },
})
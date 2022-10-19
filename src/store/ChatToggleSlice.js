import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ChatBtnActive: false
}

export const chatToggleSlice = createSlice({
  name: 'ChatBtn',
  initialState,
  reducers: {
    toggleChat: (state) => {

      state.ChatBtnActive = !state.ChatBtnActive
    }
  }
})

// Action creators are generated for each case reducer function
export const { toggleChat } = chatToggleSlice.actions

export default chatToggleSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userName: 'Гъргулинка'
}

export const activeUserSlice = createSlice({
  name: 'activeUser',
  initialState,
  reducers: {
    changeUserName: (state, action) => {

      state.userName = action.userName
    }
  }
})

// Action creators are generated for each case reducer function
export const { changeUserName } = activeUserSlice.actions

export default activeUserSlice.reducer
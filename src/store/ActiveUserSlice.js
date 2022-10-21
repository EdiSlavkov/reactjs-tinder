import { createSlice } from '@reduxjs/toolkit'
import { getLoggedUser, updateData } from '../server/server';

const initialState = getLoggedUser();

export const activeUserSlice = createSlice({
  name: 'activeUser',
  initialState,
  reducers: {
    changeUserData: (state) => {
      updateData(state);

    },
    temporaryData : (state, action) => {
      const [key, value] = action.payload;
      return {
        ...state,
        [key]:value
      }
  }
  }
})

// Action creators are generated for each case reducer function
export const { changeUserData, temporaryData } = activeUserSlice.actions

export default activeUserSlice.reducer
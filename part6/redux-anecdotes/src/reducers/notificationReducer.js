import { createSlice } from "@reduxjs/toolkit"

const initialState = null
let timeoutID

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    hideNotification(state, action) {
      return action.payload = ''
    }
  }
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const setNotification = (message, duration) => {
  return dispatch => {
    dispatch(showNotification(message))
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      dispatch(hideNotification())
    }, duration * 1000)
  }
}

export default notificationSlice.reducer

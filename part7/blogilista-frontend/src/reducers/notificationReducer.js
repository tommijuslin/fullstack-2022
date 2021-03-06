import { createSlice } from "@reduxjs/toolkit";

let timerID;

const initialState = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload;
    },
    hideNotification(state, action) {
      return (action.payload = "");
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export const setNotification = (message, duration) => {
  return (dispatch) => {
    dispatch(showNotification(message));
    clearTimeout(timerID);
    timerID = setTimeout(() => {
      dispatch(hideNotification());
    }, duration * 1000);
  };
};

export default notificationSlice.reducer;

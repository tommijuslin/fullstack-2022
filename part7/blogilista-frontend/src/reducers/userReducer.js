import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    set(state, action) {
      return action.payload;
    },
  },
});

export const { set } = userSlice.actions;

export const setUser = (user) => {
  return (dispatch) => {
    window.localStorage.setItem("loggedUser", JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch(set(user));
  };
};

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedUser");
    blogService.setToken(null);
    dispatch(set(null));
  };
};

export default userSlice.reducer;

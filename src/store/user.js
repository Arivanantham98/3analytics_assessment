import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const user = localStorage.getItem("user");

const initialUser = user ? JSON.parse(localStorage.getItem("user")) : null;

const slice = createSlice({
  name: "user",
  initialState: {
    user: initialUser,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logoutSuccess: (state, action) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export default slice.reducer;

const { loginSuccess, logoutSuccess } = slice.actions;

export const login =
  ({ username, password }) =>
  async (dispatch) => {
    try {
      if (username === "admin" && password === "admin@123") {
        dispatch(loginSuccess({ username }));
      } else {
        toast.error("Please enter valid credentials !", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } catch (e) {
      return console.error(e.message);
    }
  };

export const logout = () => async (dispatch) => {
  try {
    return dispatch(logoutSuccess());
  } catch (e) {
    return console.error(e.message);
  }
};

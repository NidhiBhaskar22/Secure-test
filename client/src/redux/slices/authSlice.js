import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const setAxiosAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

const loadAuthFromLocalStorage = () => {
  try {
    const data = JSON.parse(localStorage.getItem("auth"));
    if (data?.token) {
      setAxiosAuthHeader(data.token);
    }
    return data || { user: null, token: "", profilePicture: "" };
  } catch (error) {
    console.error("Error loading auth from localStorage:", error);
    return { user: null, token: "", profilePicture: "" };
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: loadAuthFromLocalStorage(),
  reducers: {
    setAuth: (state, action) => {
      const newState = { ...state, ...action.payload };
      localStorage.setItem("auth", JSON.stringify(newState)); 
      setAxiosAuthHeader(newState.token); 
      return newState;
    },
    clearAuth: () => {
      localStorage.removeItem("auth");
      setAxiosAuthHeader(null);
      return { user: null, token: "", profilePicture: "" };
    },
    updateAuth: (state, action) => {
      const updatedState = { ...state, ...action.payload };
      localStorage.setItem("auth", JSON.stringify(updatedState));
      setAxiosAuthHeader(updatedState.token);
      return updatedState;
    },
  },
});

export const { setAuth, clearAuth, updateAuth } = authSlice.actions;
export default authSlice.reducer;

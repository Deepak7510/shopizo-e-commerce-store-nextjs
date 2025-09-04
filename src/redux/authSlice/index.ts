import { createSlice } from "@reduxjs/toolkit";

export interface UserInfo {
  name: string;
  email: string;
  role: string;
  avatar?: string; // optional
}

export interface AuthState {
  userInfo: UserInfo | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  userInfo: null,
  isAuthenticated: false,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userInfo = action.payload.userInfo;
    },
    setLogout: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
    },
  },
});

export const { setLogin, setLogout } = counterSlice.actions;

export default counterSlice.reducer;

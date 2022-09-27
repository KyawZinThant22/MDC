import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
  value: {
    id: string;
    token: string;
    userName: string;
    email: string;
  };
}

const initialState: IAuthState = {
  value: {
    id: "",
    token: "",
    userName: "",
    email: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAuth: (state, action: PayloadAction<any>) => {
      const { token, userName, email, id } = action.payload;
      state.value = {
        token,
        userName,
        email,
        id,
      };
    },
    logout: (state) => {
      state.value = {
        id: "",
        token: "",
        userName: "",
        email: "",
      };
    },
  },
});

export const { loginAuth, logout } = authSlice.actions;
export default authSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
  value: {
    id: Number;
    status: boolean;
    token: string;
    userName: string;
    email: string;
    image: string;
    role: string;
  };
}

const initialState: IAuthState = {
  value: {
    id: 0,
    status: false,
    token: "",
    userName: "",
    email: "",
    image: "",
    role: "unauth",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      const { token, status, userName, email, image, role, id } =
        action.payload;
      state.value = {
        status: true,
        token,
        userName,
        email,
        id,
        image,
        role,
      };
    },
    logout: (state) => {
      state.value = {
        id: 0,
        status: false,
        token: "",
        userName: "",
        email: "",
        image: "",
        role: "unauth",
      };
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

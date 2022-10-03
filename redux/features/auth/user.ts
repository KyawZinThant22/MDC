import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
  value: {
    user: any | null;
  };
}

const initialState: IAuthState = {
  value: {
    user: null,
  },
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userData: (state, action: PayloadAction<any>) => {
      state.value = {
        user: action.payload,
      };
    },
  },
});

export const { userData } = authSlice.actions;
export default authSlice.reducer;

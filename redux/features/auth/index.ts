import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import AdminApi from "../../../api/Adminapi";

interface IAuthState {
  value: {
    token?: string | null;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    message: string;
  };
}

let token = Cookies.get("_access_token_react");
const initialState: IAuthState = {
  value: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
    token: token ? token : null,
  },
};

//Register User

export const register = createAsyncThunk(
  `${URL}user/singup`,
  async (token, thunkAPI) => {
    try {
      return await AdminApi.registerUser(token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.value = {
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: "",
      };
    },
    extraReducers: (builder: any) => {
      builder
        .addCase(register.pending, (state: IAuthState) => {
          state.value = {
            ...state.value,
            isLoading: true,
          };
        })
        .addCase(
          register.fulfilled,
          (state: IAuthState, actions: PayloadAction<any>) => {
            state.value = {
              ...state.value,
              isLoading: true,
              isSuccess: true,
              token: actions.payload,
            };
          }
        )
        .addCase(
          register.rejected,
          (state: IAuthState, actions: PayloadAction<any>) => {
            state.value = {
              ...state.value,
              isLoading: false,
              isSuccess: false,
              message: actions.payload,
              token: null,
            };
          }
        );
    },
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

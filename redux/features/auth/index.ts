import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import AdminApi from "../../../api/Adminapi";

interface IAuthState {
  value: {
    user: any | null;
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
    user: token ? token : null,
  },
};

//Register User
export const registerUser = createAsyncThunk(
  `${URL}user/singup/`,
  async (user: any, thunkAPI) => {
    try {
      return await AdminApi.registerUser(user);
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
    resetData: (state) => {
      state.value = {
        ...state.value,
        isLoading: false,
        isError: false,
        isSuccess: false,
      };
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(registerUser.pending, (state: IAuthState) => {
        state.value = {
          ...state.value,
          isLoading: true,
        };
      })
      .addCase(
        registerUser.fulfilled,
        (state: IAuthState, actions: PayloadAction<any>) => {
          state.value = {
            ...state.value,
            isLoading: false,
            isSuccess: true,
            user: actions.payload,
          };
        }
      )
      .addCase(
        registerUser.rejected,
        (state: IAuthState, actions: PayloadAction<any>) => {
          state.value = {
            ...state.value,
            isLoading: false,
            isSuccess: false,
            message: actions.payload,
            user: null,
          };
        }
      );
  },
});

export const { resetData } = authSlice.actions;
export default authSlice.reducer;

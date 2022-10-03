import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { useEffect } from "react";
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

const initialState: IAuthState = {
  value: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
    user: null,
  },
};

//Register User
export const registerUser = createAsyncThunk(
  `create`,
  async (user: any, thunkAPI) => {
    try {
      const res = await AdminApi.registerUser(user);
      console.log(res);
      if (res.status === "fail") {
        throw new Error(res.message);
      }
      if (res.status === "success") {
        Cookies.set("_access_token_react", res.token as any);
      }
      return res;
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

//Register User
export const Login = createAsyncThunk(`Login`, async (user: any, thunkAPI) => {
  try {
    const res = await AdminApi.LogIn(user);
    if (res.status === "fail") {
      throw new Error(res.message);
    }
    if (res.status === "success") {
      Cookies.set("_access_token_react", res.token as any);
    }
    return res;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//logout user

export const Logout = createAsyncThunk(`logout`, async () => {
  Cookies.remove("_access_token_react");
});

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
    validateAuth: (state, action: PayloadAction<any>) => {
      state.value = {
        ...state.value,
        isSuccess: true,
        user: action.payload,
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
        (state: IAuthState, action: PayloadAction<any>) => {
          console.log(action.payload);
          state.value = {
            ...state.value,
            isLoading: false,
            isSuccess: true,
            isError: false,
            user: action.payload,
          };
        }
      )
      .addCase(
        registerUser.rejected,
        (state: IAuthState, action: PayloadAction<any>) => {
          state.value = {
            ...state.value,
            isLoading: false,
            isError: true,
            isSuccess: false,
            message: action.payload,
            user: null,
          };
        }
      )
      .addCase(Login.pending, (state: IAuthState) => {
        state.value = {
          ...state.value,
          isLoading: true,
        };
      })
      .addCase(
        Login.fulfilled,
        (state: IAuthState, action: PayloadAction<any>) => {
          console.log(action.payload);
          state.value = {
            ...state.value,
            isLoading: false,
            isSuccess: true,
            isError: false,
            user: action.payload,
          };
        }
      )
      .addCase(
        Login.rejected,
        (state: IAuthState, action: PayloadAction<any>) => {
          state.value = {
            ...state.value,
            isLoading: false,
            isError: true,
            isSuccess: false,
            message: action.payload,
            user: null,
          };
        }
      )
      .addCase(Logout.fulfilled, (state: IAuthState) => {
        state.value = {
          ...state.value,
          user: null,
        };
      });
  },
});

export const { resetData, validateAuth } = authSlice.actions;
export default authSlice.reducer;

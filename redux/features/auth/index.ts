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
      const res = await AdminApi.registerUser(user);
      if (res.status === "fail") {
        throw new Error(res.message);
      }
      if (res.status === "success") {
        Cookies.set("_access_token_react", res.token as any);
      }
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

export const { resetData } = authSlice.actions;
export default authSlice.reducer;

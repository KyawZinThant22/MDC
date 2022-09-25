import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IalertState {
  value: {
    open: boolean;
    type: "info" | "success" | "warning" | "error" | "idle";
    title: string;
    desc: string;
  };
}

const initialState: IalertState = {
  value: {
    open: false,
    type: "idle",
    title: "",
    desc: "",
  },
};

export const AlertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    openAlert: (state, action: PayloadAction<any>) => {
      const { title, desc, type } = action.payload;
      state.value = {
        open: true,
        type,
        desc,
        title,
      };
    },
    closeAlert: (state) => {
      state.value = {
        open: false,
        type: "idle",
        title: "",
        desc: "",
      };
    },
  },
});

export const { openAlert, closeAlert } = AlertSlice.actions;

export default AlertSlice.reducer;

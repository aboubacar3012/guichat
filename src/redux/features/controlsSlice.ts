import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


type Controls = {
  values: {
    showRoomForm: boolean;
  };
};

const initialState: Controls = {
  values: {
    showRoomForm: false,
  },
};

export const controlsSlice = createSlice({
  name: "controlsSlice",
  initialState,
  reducers: {
    updateControl: (state, action: PayloadAction<object>) => {
      state.values = { ...state.values, ...action.payload };
    },
    clearControls: () => {
      return initialState;
    },
  },
});

export const { updateControl, clearControls } = controlsSlice.actions;

export default controlsSlice.reducer;

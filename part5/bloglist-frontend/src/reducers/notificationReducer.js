import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotification() {
      return null;
    },
  },
});

export const { setNotification, removeNotification } =
  notificationSlice.actions;

let timeId = 0;
export const showNotification = (message, time = 5000) => {
  return async (dispatch) => {
    clearTimeout(timeId);
    timeId = setTimeout(() => dispatch(removeNotification()), time);
    dispatch(setNotification(message));
  };
};

export default notificationSlice.reducer;

import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    }
  }
})
export const { setNotification } = notificationSlice.actions

let timeId = 0
export const showNotification = (notification, time=5000) => {
  return async (dispatch) => {
    clearTimeout(timeId)
    timeId = setTimeout(
      () => dispatch(setNotification(null)),
      time
    )
    dispatch(setNotification(notification))
  }
}
  
export default notificationSlice.reducer
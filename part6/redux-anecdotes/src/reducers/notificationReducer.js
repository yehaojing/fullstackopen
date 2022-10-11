const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SHOW": {
      return action.data.notification;
    }
    default:
      return state;
  }
}

let timeId = 0

export const showNotification = (notification, time=5000) => {
  return async (dispatch) => {
    clearTimeout(timeId)
    timeId = setTimeout(
      () => dispatch({
        type: "SHOW", 
        data: {
          notification: null
        }
      }),
      time
    )

    dispatch({
      type: "SHOW",
      data: {
        notification
      },
    })
  }

}
  
export default notificationReducer;
let timeout = null
const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'CLEAR':
      return null
    default:
      return state
  }
}

export const notificationChange = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification,
  }
}

export const clearNotification = () => {
  if (timeout !== null){
    clearTimeout(timeout)
  }
  return {
    type: 'CLEAR',
  }
}

export const setNotification = (notification, time) => {
  return async (dispatch) => {
    dispatch(clearNotification())
    dispatch(notificationChange(notification))
    timeout= setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}

export default notificationReducer

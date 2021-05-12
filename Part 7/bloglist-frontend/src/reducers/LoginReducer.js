import loginServices from '../services/login'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    default:
      return state
  }
}

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const newUser = await loginServices.login(credentials)
    dispatch({
      type: 'LOGIN',
      data: newUser,
    })
  }
}

export const initializeUser = () => {
  return async (dispatch) => {
    const notes=
  }
}


export default reducer

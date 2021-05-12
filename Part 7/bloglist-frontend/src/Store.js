import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools'

import BlogReducer from './reducers/BlogReducer'
import LoginReducer from './reducers/LoginReducer'
import NotificationReducer from './reducers/NotificationReducer'

const reducer = combineReducers({
  blogs: BlogReducer,
  User: LoginReducer,
  Notification: NotificationReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Provider from 'redux-thunk'
import store from './Store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

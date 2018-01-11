import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import UserInterface from './components'

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <UserInterface />
  </Provider>,
  document.getElementById('app')
)

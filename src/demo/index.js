import './index.less'
import './common/patch'
import util from 'ant-util'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { connect, Provider } from 'react-redux'
import { logger, promise, thunk } from './middleware'
import handles from './handle'
import Layout from './page/layout'
import { DATASOURCE } from './common/constant'

const { setDefault, identity } = util

const App = connect(identity)(Layout)
const storeCreator = compose(applyMiddleware(logger, promise, thunk))(createStore)
const store = storeCreator(handles, setDefault(window[DATASOURCE], {}))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-content')
)

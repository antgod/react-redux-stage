import './index.less'
import './common/patch'
import util from 'ant-util'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { connect, Provider } from 'react-redux'
import promise from 'redux-promise'
import { logger } from './middleware'
import handles from './handle'
import Layout from './page/layout'
import { DATASOURCE } from './common/constant'
import mock from './mock'

const { identity, mergeDefault } = util

const App = connect(identity)(Layout)
const storeCreator = compose(applyMiddleware(logger, promise))(createStore)
const store = storeCreator(handles, mergeDefault(window[DATASOURCE], mock))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-content')
)

import { combineReducers } from 'redux'

const noop = (state = []) => state

const rpc = (state = [], { type, data }) => {
  if (state[type]) {
    return {
      ...state,
      [type]: data,
    }
  }
  return state
}

const reducers = combineReducers({
  rpc,
  cms: noop,
  userinfo: noop,
})

export default reducers

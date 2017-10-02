const logger = () => next => (action) => {
  console.log('logger: ', action)
  next(action)
  console.log('logger finish: ', action)
}

const thunk = ({ dispatch }) => next => (action) => {
  if (typeof action === 'function') {
    return action(dispatch)
  }

  return next(action)
}

const promise = ({ dispatch }) => next => (action) => {
  function isPromise(val) {
    return val && typeof val.then === 'function'
  }
  return isPromise(action)
    ? action.then(dispatch)
    : next(action)
}

export {
  logger,
  thunk,
  promise,
}

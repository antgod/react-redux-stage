const logger = () => next => (action) => {
  console.log('logger: ', action)
  next(action)
  console.log('logger finish: ', action)
}

export {
  logger,
}

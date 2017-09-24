const async = require('async')

const a = async (...args) => {
  console.log('a p', ...args)
  const result = await new Promise(rej => setTimeout(() => rej('a result'), 1000))
  return {
    result,
  }
}

const b = async (...args) => {
  console.log('b p', ...args)
  const result = await new Promise(rej => setTimeout(() => rej('b result'), 2000))
  return {
    result,
  }
}

async.compose(a, b)('init', (err, result) => console.log('result', result))


const prompt = require('prompt')

module.exports = schema =>
  new Promise((res, rej) => {
    prompt.start()
    prompt.get(schema, (error, result) => {
      if (error) {
        console.log(error)
        rej(error)
      }
      res(result)
    })
  })

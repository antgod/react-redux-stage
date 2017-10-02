const path = require('path')
const fs = require('fs')

const lowercase = str => str === undefined || str.length === 0 ? str : `${str[0].toLowerCase()}${str.slice(1)}`

const createFolder = (to) => {
  const sep = path.sep
  const folders = path.dirname(to).split(sep)
  let p = ''
  folders.forEach((folder) => {
    p += `${folder}${sep}`
    if (!fs.existsSync(p)) {
      fs.mkdirSync(p)
    }
  })
}

const createFile = (options) => {
  const filename = options.filename
  createFolder(filename)
  fs.createWriteStream(filename)
}

const readFile = options => new Promise((res, rej) =>
  fs.readFile(options.filename, options, (err, data) => err ? rej(err) : res(data)))

const readdirSync = filepath => fs.readdirSync(filepath)

const writeFile = options => new Promise((res, rej) => {
  const filename = options.filename

  const exist = fs.existsSync(filename)

  if (!exist) {
    createFile({
      filename,
    })
  }

  fs.writeFile(filename, options.data, options, (err, data) => err ? rej(err) : res(data))
})

module.exports = {
  lowercase,
  readFile,
  readdirSync,
  writeFile,
}

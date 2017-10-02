const path = require('path')
const ejs = require('ejs')
const util = require('ant-util').default
const EventEmitter = require('events').EventEmitter
const { lowercase, readFile, writeFile, readdirSync } = require('./util')

const { capitalize, map, exec } = util
const event = new EventEmitter()

const COMFIRMED = {
  YES: 'y',
  NO: 'n',
}

const analysisDependence = (isState, isHoc) => {
  if (isState !== COMFIRMED.YES) {
    return 'index.stateless.js.temp'
  }
  if (isHoc !== COMFIRMED.YES) {
    return 'index.nohoc.js.temp'
  }
  return 'index.js.temp'
}

// 创建用户组件
const generateComponent = (moduleName, { pathname, isState = true, isHoc = true }, { componentLength, currentIndex }) => {
  const dir = '../../template/composite'
  const filenames = {
    js: path.resolve(__dirname, dir, analysisDependence(isState, isHoc)),
    less: path.resolve(__dirname, '../../template/composite/index.less.temp'),
  }

  const generfile = (filename, type) => {
    readFile({ filename, encoding: 'utf8' })
      .then(data => ejs.render(data, { moduleName, ModuleName: capitalize(moduleName) }))
      .then(data => writeFile({ filename: path.resolve(process.cwd(), pathname, 'composite', moduleName, `index.${type}`), data }))
      .then(() => console.log(`创建'${moduleName}/index.${type}'成功`))
      .then(exec(type === 'js' && currentIndex === componentLength - 1, () => event.emit('inject', pathname)))
  }

  map(filenames, generfile)
}

// 创建用户组件集
const generateComponents = (components, options) =>
  components.forEach((moduleName, index) =>
    generateComponent(lowercase(moduleName), options, { componentLength: components.length, currentIndex: index }
  )
)

// 注入用户组件集
const injectComponents = (pathname, components) => {
  const filename = path.resolve(__dirname, '../../template/page/layout.js.temp')
  readFile({ filename, encoding: 'utf8' })
  .then(data => ejs.render(data, { components }))
  .then(data => writeFile({ filename: path.resolve(process.cwd(), pathname, 'page/layout.js'), data })
    .then(() => console.log('注入组件集成功'))
  )
}

// 注入用户mock数据集
const injectMocks = (pathname, components) => {
  const filename = path.resolve(__dirname, '../../template/mock/index.json.temp')
  readFile({ filename, encoding: 'utf8' })
    .then(data => ejs.render(data, { components }))
    .then(data => writeFile({ filename: path.resolve(process.cwd(), pathname, 'mock/index.json'), data })
      .then(() => console.log('注入mock数据集成功'))
  )
}

const inject = (pathname) => {
  const components = readdirSync(path.resolve(process.cwd(), pathname, 'composite')).filter(component => component !== 'common')
  injectComponents(pathname, components)
  injectMocks(pathname, components)
}


event.on('inject', inject)
event.on('injectMocks', injectMocks)

module.exports = {
  generateComponents,
  injectComponents,
}

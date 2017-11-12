const path = require('path')
const ejs = require('ejs')
const util = require('ant-util').default
const { lowercase, readFile, writeFile, readdirSync } = require('./util')

const { capitalize, map, exec } = util

const COMFIRMED = {
  YES: 'y',
  NO: 'n',
}

// 注入用户mock数据集
const injectMocks = (pathname, components, callback) => {
  const filename = path.resolve(__dirname, '../../template/mock/index.json.temp')
  readFile({ filename, encoding: 'utf8' })
    .then(data => ejs.render(data, { components }))
    .then(data => writeFile({ filename: path.resolve(process.cwd(), pathname, 'mock/index.json'), data })
    .then(() => console.log('注入mock数据集成功'))
    .then(() => callback({ pathname }))
  )
}

// 注入用户组件集
const injectLayoutComponents = (pathname, components, callback) => {
  const filename = path.resolve(__dirname, '../../template/page/layout.js.temp')
  readFile({ filename, encoding: 'utf8' })
  .then(data => ejs.render(data, { components }))
  .then(data => writeFile({ filename: path.resolve(process.cwd(), pathname, 'page/layout.js'), data })
    .then(() => console.log('注入组件集成功'))
    .then(() => injectMocks(pathname, components, callback))
  )
}

const inject = (pathname, callback) => {
  console.log('inject start')
  const components = readdirSync(path.resolve(process.cwd(), pathname, 'composite')).filter(component => component !== 'common')
  injectLayoutComponents(pathname, components, callback)
}

const analysisDependence = (isState, isHOC) => {
  if (isState === COMFIRMED.NO) {
    return 'index.stateless.js.temp'
  }
  if (isHOC === COMFIRMED.NO) {
    return 'index.nohoc.js.temp'
  }
  return 'index.js.temp'
}

// 创建用户组件
const generateComponent = (moduleName, { pathname, isState = true, isHOC = true }, { componentLength, currentIndex }, callback) => {
  const dir = '../../template/composite'
  const filenames = {
    js: path.resolve(__dirname, dir, analysisDependence(isState, isHOC)),
    less: path.resolve(__dirname, '../../template/composite/index.less.temp'),
  }

  const generfile = (filename, type) => {
    readFile({ filename, encoding: 'utf8' })
      .then(data => ejs.render(data, { moduleName, ModuleName: capitalize(moduleName) }))
      .then(data => writeFile({ filename: path.resolve(process.cwd(), pathname, 'composite', moduleName, `index.${type}`), data }))
      .then(() => console.log(`创建'${moduleName}/index.${type}'成功`))
      .then(exec(type === 'js' && currentIndex === componentLength - 1, () => inject(pathname, callback)))
  }

  map(filenames, generfile)
}

// 创建用户组件集
const generateComponents = (components, options, callback) =>
  components.forEach((moduleName, index) =>
    generateComponent(lowercase(moduleName), options, { componentLength: components.length, currentIndex: index }, callback)
  )

module.exports = {
  generateComponents,
}

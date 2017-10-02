const path = require('path')
const ejs = require('ejs')
const util = require('ant-util').default
const EventEmitter = require('events').EventEmitter
const cmd = require('../../common/cmd')
const { lowercase, readFile, writeFile, readdirSync } = require('./util')

const { capitalize, map, exec, remove, keys } = util
const event = new EventEmitter()

// 执行初始化命令
const execInitialCommand = async({ src, target }) => {
  const command = {
    cmd: `cp -r ${src} ${target}`,
  }
  await cmd(command)
  return '初始化成功'
}

// 注射器
const injector = pathname => ({
  src: path.resolve(__dirname, '../..', 'model'),
  target: path.resolve(process.cwd(), pathname),
})

const analysisDependence = (isState, isHoc) => {
  if (!isState) {
    return 'index.stateless.js.temp'
  }
  if (!isHoc) {
    return 'index.nohoc.js.temp'
  }
  return 'index.js.temp'
}

// 创建用户组件
const generateComponent = (moduleName, { pathname, isState = true, isHoc = true }, index) => {
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
      .then(exec(type === 'js' && index === keys(filenames).length - 1, () => event.emit('injectComponents', pathname)))
  }

  map(filenames, generfile)
}

// 注入用户组件集
const injectComponents = (pathname) => {
  const filename = path.resolve(__dirname, '../../template/page/layout.js.temp')
  const components = readdirSync(path.resolve(process.cwd(), pathname, 'composite'))

  // 通用组件不注入
  remove(components, 'common')

  readFile({ filename, encoding: 'utf8' })
    .then(data => ejs.render(data, { components }))
    .then(data => writeFile({ filename: path.resolve(process.cwd(), pathname, 'page/layout.js'), data })
    .then(() => console.log('注入组件集成功'))
  )
}

// 创建用户组件集
const generateComponents = (components, options) => components.forEach((moduleName, index) => generateComponent(lowercase(moduleName), options, index))

event.on('injectComponents', injectComponents)

module.exports = {
  execInitialCommand,
  injector,
  generateComponents,
  injectComponents,
}

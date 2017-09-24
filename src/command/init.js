/* eslint-disable */
const async = require('async')
const path = require('path')
const process = require('process')
const prompt = require('../common/prompt')
const cmd = require('../common/cmd')
const { log, chalk } = require('../common/log')
const util = require('ant-util').default

const { inject, capitalize, exec, partialLeft } = util

const COMFIRMED = {
  YES: 'y',
  NO: 'n',
}

/* 初始化模块模板 */
const initialTemplate = async() => {
  // 声明用户指令
  const schema = {
    properties: {
      pathname: {
        description: '请输入模块相对路径名',
        message: '模块相对路径名不能为空',
        required: true,
      },
    },
  }

  // 执行初始化命令
  const exec = async({ src, target }) => {
    const command = {
      cmd: `cp -r ${src} ${target}`,
    }
    await cmd(command)
    return '初始化成功'
  }

  // 执行用户命令
  const { pathname } = await prompt(schema)

  // 注射器
  const injector = (pathname) => ({
    src: path.resolve(__dirname, '..', 'demo'),
    target: path.resolve(process.cwd(), pathname)
  })

  // 注入执行初始化命令参数
  const result = await inject(await exec, injector)(pathname)

  // 打印执行结果
  log(chalk.green(result))

  return {
    pathname
  }
}

/* 创建模块组件 */
const createComponent = async({ pathname }) => {
  // 声明用户指令
  const input = {
    properties: {
      component: {
        description: '请输入模块包含的组件，用逗号或空格分隔',
      },
    },
  }

  // 执行用户命令
  const { component } = await prompt(input)

  const reg = /\s|,/
  const components = component.split(reg).map(component => capitalize(component))

  const confirm = {
    properties: {
      confirmed: {
        description: `将要创建(${components.join(',')})组件，是否继续(y/n)？`,
      },
    },
  }

  // 执行用户命令
  const { confirmed } = await prompt(confirm)

  exec(confirmed !== COMFIRMED.YES, partialLeft(process.exit, 1))()


  console.log('component', components, confirmed, pathname)
}

const generator = async() => {
  const fns = [initialTemplate, createComponent]
  async.compose(...fns.reverse())(null, (err, result) => console.log('result', err))
}

module.exports = generator

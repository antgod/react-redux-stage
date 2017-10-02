/* eslint-disable */
const async = require('async')
const process = require('process')
const prompt = require('../../common/prompt')
const { log, chalk } = require('../../common/log')
const util = require('ant-util').default
const { execInitialCommand,injector, generateComponents } = require('./common')

const { inject, capitalize, partial, partialLeft, grund } = util

// 逗号或者空格分隔符
const SEP = /\s|,/

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

  // 执行用户命令
  const { pathname } = await prompt(schema)

  // 注入执行初始化命令参数
  const result = await inject(await execInitialCommand, injector)(pathname)

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
      isState: {
        description: '组件是否为状态组件(y/n,默认为是)？',
      },
      isHoc: {
        description: '组件是否为高阶组件(y/n,默认为是)？',
      },
    },
  }

  // 执行用户命令
  const { component, isState, isHoc } = await prompt(input)
  const components = component.split(SEP).map(component => capitalize(component))

  const confirm = {
    properties: {
      confirmed: {
        description: `将要创建(${components.join(',')})组件，是否继续(y/n)？`,
      },
    },
  }

  const { confirmed } = await prompt(confirm)
  grund(confirmed === COMFIRMED.YES,
    partial(generateComponents, { pathname, isState, isHoc }),
    partialLeft(createComponent, { pathname })
  )(components)
}

const generator = async() => {
  const fns = [initialTemplate, createComponent]
  async.compose(...fns.reverse())()
}

module.exports = generator

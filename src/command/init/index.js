const async = require('async')
const prompt = require('../../common/prompt')
const { log, chalk } = require('../../common/log')
const util = require('ant-util').default
const createComponent = require('../add')
const { execInitialCommand, injector } = require('./common')

const { inject } = util

/* 初始化模块模板 */
const initialTemplate = async() => {
  // 声明用户指令
  const schema = {
    properties: {
      pathname: {
        description: '请输入模块相对路径名',
        message: '模块相对路径名不能为空,且只能是数字、字母、下划线',
        pattern: /^\w+$/,
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
    pathname,
  }
}

const generator = async() => {
  const fns = [initialTemplate, createComponent]
  async.compose(...fns.reverse())()
}

module.exports = generator

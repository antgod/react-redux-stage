const prompt = require('../../common/prompt')
const util = require('ant-util').default
const { generateComponents } = require('./common')

const { capitalize, partial, partialLeft, grund } = util

// 逗号或者空格分隔符
const SEP = /\s|,/

const COMFIRMED = {
  YES: 'y',
  NO: 'n',
}

/* 创建模块组件 */
const createComponent = async({ pathname = '' }) => {
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
  const components = component.split(SEP).map(comp => capitalize(comp))

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

module.exports = createComponent

const prompt = require('../../common/prompt')
const util = require('ant-util').default
const { generateComponents } = require('./common')

// 逗号或者空格分隔符
const SEP = /\s|,/
const YES = 'y'
const assign = Object.assign
const { capitalize, partial, partialLeft, grund } = util

const boolProps = {
  default: 'y',
  type: 'string',
  required: true,
  pattern: /[yn]/,
}

const schemas = {
  componentsSchema: {
    properties: {
      components: {
        description: '请输入模块包含的组件，用逗号或空格分隔',
        type: 'string',
        required: true,
        message: '组件不能为空,',
      },
      isAdvance: assign({
        description: '是否开启高级模式(包括组件类型，是否需要继承、包装等设置，y/n)',
      }, boolProps, { default: 'n' }),
    },
  },
  componentTypeSchema: {
    properties: {
      isState: assign({
        description: '组件是否需要继承React.Component类(状态组件，y/n)',
      }, boolProps),
      isHOC: assign({
        description: '组件是否需要包装或继承(y/n)',
      }, boolProps),
    },
  },
}

const confirmSchemaCreator = componentList => ({
  properties: {
    confirmed: assign({
      description: `将要创建(${componentList.join(',')})组件，是否继续(y/n)`,
    }, boolProps),
  },
})

/* 创建模块组件 */
const createComponent = async({ pathname = '' }) => {
  const { components, isAdvance } = await prompt(schemas.componentsSchema)
  const componentList = components.split(SEP).filter(item => !!item).map(comp => capitalize(comp))

  let isState = YES
  let isHOC = YES
  if (isAdvance === YES) {
    const types = await prompt(schemas.componentTypeSchema)
    isState = types.isState
    isHOC = types.isHOC
  }

  const confirmSchema = confirmSchemaCreator(componentList)

  const { confirmed } = await prompt(confirmSchema)

  grund(confirmed === YES,
    partial(generateComponents, { pathname, isState, isHOC }, createComponent),
    partialLeft(createComponent, { pathname })
  )(componentList)
}

module.exports = createComponent

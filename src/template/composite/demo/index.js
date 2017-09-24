import './index.less'
import util from 'ant-util'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PAGE_PREFIX, Titles } from '../../common/constant'
import Title from '../../component/title'
import Error, { ERROR_LABEL } from '../../component/error'

// 工具包获取
const { grund, always, match, any, all } = util
const { gets, get } = util.plugins.exist

// 模块名定义区
const module = 'demo'
const prefix = `${PAGE_PREFIX}-${module}`

// 私有组件放在页面顶部，如果组件过大，需要单独拆分文件
const DemoTitle = ({ title, link, url }) => <Title title={title} link={<a href={url}>{link}</a>} />

class Demo extends Component {
  renderBusiness(data) {
    return `商户余额，${data.balance}`
  }

  renderCustomer(data) {
    return `个人余额，${data.balance}`
  }

  // 依赖函数就近声明
  conditionCreator = (type, flag) => {
    return [
      { condition: any(type === 1, flag === true)(true), action: this.renderBusiness },
      { condition: all(type === 1, flag === true)(true), action: this.renderCustomer },
    ]
  }

  renderSuccess = (data) => {
    const { type, flag } = data || {}
    return (<div>
      <DemoTitle title={Titles.DEMO.TITLE} link={Titles.DEMO.LINK} url={Titles.DEMO.URL} />
      {match(this.conditionCreator(type, flag))(data)}
    </div>)
  }

  renderFailure() {
    return (<div>
      <Error message={ERROR_LABEL.ERROR} />
    </div>)
  }

  render() {
    const { success, data } = gets(this.props)({
      success: `${module}.success`,
      data: `${module}.data`,
    })
    const component = grund(always(success), this.renderSuccess, this.renderFailure)(data)
    return (<div className={`${prefix} item-block`}>
      {component}
    </div>)
  }
}

function mapStateToProps(state) {
  return {
    demo: get(state, 'rpc.demo'),
  }
}

export default connect(mapStateToProps)(Demo)

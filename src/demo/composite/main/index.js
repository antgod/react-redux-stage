import './index.less'
import util from 'ant-util'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Input } from 'antd'
import action from '../../action'
import { PAGE_PREFIX, Titles } from '../../common/constant'
import Title from '../../component/title'
import Error, { ERROR_LABEL } from '../../component/error'

// 工具包获取
const { grund, always, filter } = util
const { gets, get } = util.plugins.exist

// 模块名定义区
const module = 'main'
const prefix = `${PAGE_PREFIX}-${module}`

// 私有组件放在页面顶部，如果组件过大，需要单独拆分文件
const MainTitle = ({ title }) => <Title title={title} />

class Main extends Component {

  refreshHandle = (value) => {
    const list = get(this.props, 'menu.data.list')
    const data = {
      success: true,
      data: {
        list: filter(list, val => val.indexOf(value) > 0),
      },
    }
    this.props.action.handle(data)
  }

  renderSuccess = () => {
    return (<div>
      <MainTitle title={Titles.MAIN.TITLE} />
      <Input onChange={e => this.refreshHandle(e.target.value)} placeholder="请输入要查找的菜单" />
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
    main: get(state, 'rpc.main'),
    menu: get(state, 'rpc.menu'),
  }
}

function mapDispatchToProps(dispatch) {
  return { action: bindActionCreators(action, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)

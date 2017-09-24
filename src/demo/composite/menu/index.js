import './index.less'
import util from 'ant-util'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PAGE_PREFIX, Titles } from '../../common/constant'
import Title from '../../component/title'
import Error, { ERROR_LABEL } from '../../component/error'

// 工具包获取
const { grund, always, map2Array } = util
const { gets, get } = util.plugins.exist

// 模块名定义区
const module = 'menu'
const prefix = `${PAGE_PREFIX}-${module}`

// 私有组件放在页面顶部，如果组件过大，需要单独拆分文件
const MenuTitle = ({ title }) => <Title title={title} />

class Menu extends Component {

  renderSuccess = (data) => {
    const list = get(data, 'list', {})
    return (<div>
      <MenuTitle title={Titles.MENU.TITLE} />
      {
        map2Array(list, (item, index) => <div key={index}>{item}</div>)
      }
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
    menu: get(state, 'rpc.menu'),
  }
}

export default connect(mapStateToProps)(Menu)

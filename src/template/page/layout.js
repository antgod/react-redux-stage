import React, { Component } from 'react'
import Controller from './controller'
// import Panel from '../component/panel'
import Demo from '../composite/demo'
import Restore from './restore'
import { PAGE_PREFIX } from '../common/constant'

const restore = new Restore()

@Controller
class Layout extends Component {
  componentDidMount() {
    /* 这里做dom操作，比如浏览器滚动或不定位弹出层等react不易实现功能 */
    restore.adjust()
  }

  render() {
    return (<div className={PAGE_PREFIX}>
      <Demo />
    </div>)
  }
}

export default Layout

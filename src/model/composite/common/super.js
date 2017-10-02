import util from 'ant-util'
import { Component } from 'react'

const { grund, always } = util

class SuperComponent extends Component {
  state = {}

  renderSuccess() {
    return null
  }

  renderFailure() {
    return null
  }

  render({ success, data }) {
    return grund(always(success), this.renderSuccess, this.renderFailure)(data)
  }
}

export default SuperComponent

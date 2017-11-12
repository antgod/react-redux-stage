import React, { Component } from 'react'
import Spm, { SPM_PAGE } from '../common/spm'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import util from 'ant-util'
import action from '../action'

const { identity } = util

const Controller = (WrappedComponent) => {
  class ControllerClass extends Component {
    componentDidMount() {
      this.configSpm()
    }

    configSpm() {
      Spm.config({
        spmAPos: SPM_PAGE.A,
        spmBPos: SPM_PAGE.B,
      })
    }

    constructor(props) {
      super(props)
      this.state = {}
    }

    render() {
      const listeners = {}
      return <WrappedComponent {...this.state} {...listeners} {...this.props} />
    }
  }

  function mapDispatchToProps(dispatch) {
    return { action: bindActionCreators(action, dispatch) }
  }

  return connect(identity, mapDispatchToProps)(ControllerClass)
}

export default Controller

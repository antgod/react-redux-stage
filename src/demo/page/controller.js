import React, { Component } from 'react'
import Spm, { SPM_PAGE } from '../common/spm'

const Controller = (WrappedComponent) => {
  return class extends Component {
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
}

export default Controller

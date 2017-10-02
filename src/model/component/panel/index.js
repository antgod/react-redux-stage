import './index.less'
import React from 'react'
import { PAGE_PREFIX } from '../../common/constant'

const prefix = `${PAGE_PREFIX}-panel`

const Panel = ({ left, right }) => {
  return (<div className={`${prefix}-row`}>
    <div className={`${prefix}-left`}>
      { left }
    </div>
    <div className={`${prefix}-right`}>
      { right }
    </div>
  </div>)
}

export default Panel

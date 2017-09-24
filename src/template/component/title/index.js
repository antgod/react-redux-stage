import './index.less'
import React from 'react'
import { PAGE_PREFIX } from '../../common/constant'

const prefix = `${PAGE_PREFIX}-title`

const Title = ({ title, link = null, icon }) => {
  return (<div className={prefix}>
    {icon}
    {title}
    <div className="more">
      {link}
    </div>
  </div>)
}

export default Title

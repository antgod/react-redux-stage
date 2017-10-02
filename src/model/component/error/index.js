import './index.less'
import React from 'react'
import { PAGE_PREFIX } from '../../common/constant'

const prefix = `${PAGE_PREFIX}-error`

const Error = ({ message }) => <div className={prefix}>
  {message}
</div>

export default Error

const ERROR_LABEL = {
  ERROR: '系统繁忙，请稍后再试',
}

export {
  ERROR_LABEL,
}

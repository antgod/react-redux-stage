import ajax from '@alipay/ajax'

const request = options => new Promise(res => ajax({ ...options, success: data => res(data) }))

export default request

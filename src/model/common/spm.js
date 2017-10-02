import '@alipay/tracert/lib/starter'
import util from 'ant-util'

const { setDefault, identity } = util

const Tracert = setDefault(window.Tracert, {})

const Spm = {
  // 触发曝光
  expo: setDefault(Tracert.expo, identity),

  // 触发点击
  click: setDefault(Tracert.click, identity),

  // 触发PV
  pv: setDefault(Tracert.logPv, identity),

  // 配置A,B位等
  config: setDefault(Tracert.config, identity),
}

export default Spm

const SPM_PAGE = {
  A: 'a026',
  B: 'b1011',
}

export {
  SPM_PAGE,
}

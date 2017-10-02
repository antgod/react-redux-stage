const path = require('path')
const cmd = require('../../common/cmd')

// 执行初始化命令
const execInitialCommand = async({ src, target }) => {
  const command = {
    cmd: `cp -r ${src} ${target}`,
  }
  await cmd(command)
  return '初始化成功'
}

// 注射器
const injector = pathname => ({
  src: path.resolve(__dirname, '../..', 'model'),
  target: path.resolve(process.cwd(), pathname),
})


module.exports = {
  execInitialCommand,
  injector,
}

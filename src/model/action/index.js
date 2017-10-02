/*
 * action 类型
 */

export const MENU = 'menu'

/*
 * action 创建函数
 */
function handle(data) {
  return { type: MENU, data }
}

function handleAsync(text) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(handle(text))
    }, 1000)
  }
}

function handlePromise(text) {
  return new Promise((res) => {
    setTimeout(() => {
      res({ text })
    }, 1000)
  }).then(response => ({
    type: MENU,
    text: response.text,
  }))
}

export default {
  handle, handleAsync, handlePromise,
}

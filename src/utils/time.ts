// 获取 时间阶段
export const getTime = () => {
  let message = ''
  let time = new Date().getHours()
  if (time <= 6) {
    message = '晚上'
  } else if (time <= 12) {
    message = '早上'
  } else if (time <= 18) {
    message = '下午'
  } else {
    message = '晚上'
  }
  return message
}

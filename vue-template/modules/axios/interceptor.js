import Vue from 'vue'
const vue = new Vue()

const env = process.env

const RPODCUTION = process.env.NODE_ENV == 'prod'

export function requestSuccessFunc(requestObj) {
  RPODCUTION ? '' : console.info('requestInterceptorFunc', `url: ${requestObj.url}`, requestObj)
  const aesData = vue.$aes.encrypt(env.VUE_APP_AESKEY, JSON.stringify(requestObj.data));
  // 自定义请求拦截逻辑，可以处理权限，请求发送监控等
  requestObj.data = {
    data: aesData
  };
  vue.$bus.emit('loading')
  return requestObj
}

export function requestFailFunc(requestError) {
  // 自定义发送请求失败逻辑，断网，请求发送监控等
  vue.$bus.emit('toast', '请求失败，请稍后重试', 2000)
  vue.$bus.emit('stopLoading')
  return Promise.reject(requestError)
}

export function responseSuccessFunc(responseObj) {
  RPODCUTION ? '' : console.info(responseObj)
  vue.$bus.emit('stopLoading')

  const resData = responseObj.data

  /*登录失效*/
  if (resData.result == false) {
    vue.$bus.emit('toast', '登录失效, 请重新登录', 2000)
    vue.$bus.emit('login')
  }

  const {
    status
  } = resData

  switch (status) {
    case '0':
      // 如果业务成功
      return {
        data: resData.data,
        status: '0'
      }
    case '1':
      // 如果业务失败
      vue.$bus.emit('toast', resData.msg, 2000)
      return {
        status: '1'
      }
    case '-1':
      vue.$bus.emit('toast', resData.msg + ', 请稍后重试', 2000)
      return {
        status: '-1'
      }
    default:
      // 业务中还会有一些特殊 code 逻辑，我们可以在这里做统一处理，也可以下方它们到业务层
      return Promise.reject(resData)
  }
}

export function responseFailFunc(responseError) {
  vue.$bus.emit('stopLoading')
  vue.$bus.emit('toast', '服务异常，请稍后重试', 2000)
  // 响应失败，可根据 responseError.message 和 responseError.response.status 来做监控处理
  return Promise.reject(responseError)
}
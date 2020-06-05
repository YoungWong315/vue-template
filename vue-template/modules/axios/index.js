import axios from 'axios'
import {
  requestSuccessFunc,
  requestFailFunc,
  responseSuccessFunc,
  responseFailFunc
} from './interceptor'

let axiosInstance = {}

const env = process.env

// 默认配置
axiosInstance = axios.create({
  baseURL: env.VUE_APP_BASEURL,
  timeout: 20000,
  maxContentLength: 2000,
  /*允许携带cookie*/
  withCredentials: true, // 表示跨域请求时是否需要使用凭证, 默认false
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 注入请求拦截
axiosInstance
  .interceptors.request.use(requestSuccessFunc, requestFailFunc)
// 注入失败拦截
axiosInstance
  .interceptors.response.use(responseSuccessFunc, responseFailFunc)

export default axiosInstance
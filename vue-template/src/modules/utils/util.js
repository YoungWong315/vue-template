// 生成36位的唯一id
const generateUUID = () => {
  var d = new Date().getTime()
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(
    c,
  ) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid
}

/**
 * 返回数据类型的名字（字符串）
 * @param {any} arg 不明确类型的变量
 * @return {String} 返回变量的数据类型
 * String: '111'
 * Number: 111, NaN, Infinity
 * Boolean: true,
 * Undefined: undefined,
 * null: Null,
 * Array: [1,2,3],
 * Function: () => {} 函数
 * Object: { a: 'a', b: 'b' }
 */
const getVariableType = arg => {
  const typeStr = Object.prototype.toString.call(arg)
  return typeStr.split(' ')[1].replace(']', '')
}

/**
 * 此方法接收一个微信函数，把微信的异步方法改成promise方法
 * 实际上: 只要是异步函数, 并使用
 * {
 *  success: () => {},
 *  fail: () => {},
 *  complete: () => {}
 * }
 *
 * 作为回调, 都可以使用此方法
 *
 * @param {Function} fn 一个需要回调函数的异步函数
 * @param {Obj} parentObj 该函数的父对象
 * @return {Function} 改装后的返回 Promise对象 的函数
 *
 */
const transCallbackToPromise = (fn, parentObj = null) => {
  const tempFn = fn
  // 此处arg通常为 对象 和 函数
  fn = (arg = {}) => {
    return new Promise((resolve, reject) => {
      if (getVariableType(arg) === 'Object') {
        const response = {
          success: resolve,
          fail: reject,
          complete: resolve,
        }
        arg = { ...arg, ...response }
      }
      tempFn.call(parentObj, arg)
    })
  }
  return fn
}

/**
 * 把小程序对象类的options拼装成字符串
 * @param {Object} options { param1: 'abc', param2: 'edf' }
 * @return {String} ?param1=abc&param2=edf
 */
// 把小程序对象类的options拼装成字符串
const optionsToString = (options = {}) => {
  if (!options) return ''

  let str = '?'
  Object.keys(options).forEach(key => {
    str += `${key}=${options[key]}&`
  })
  return str.substring(0, str.length - 1)
}

/**
 * 时间戳转换成时间
 * @param {String} timeStamp 传入时间戳(或可以转换成Date对象的值)
 * @return {Object} timeStamp代表的 "年、月、日、时、分、秒"
 */
const transTimeStamp = timeStamp => {
  const padTimeWithZero = time => (time < 10 ? '0' + time : time.toString())

  const dateTemp = new Date(timeStamp)
  const y = dateTemp.getFullYear(),
    m = dateTemp.getMonth() + 1,
    d = dateTemp.getDate(),
    h = dateTemp.getHours(),
    min = dateTemp.getMinutes(),
    s = dateTemp.getSeconds()
  return {
    year: y,
    month: padTimeWithZero(m),
    day: padTimeWithZero(d),
    hour: padTimeWithZero(h),
    minute: padTimeWithZero(min),
    second: padTimeWithZero(s),
  }
}

/**
 * 计算时间差
 * @param {String} timeStamp1 时间戳1
 * @param {String} timeStamp2 时间戳2
 * @return {Object} 两个时间戳的差代表的 "年、日、时、分、秒"
 */
const getTimeGap = (timeStamp1, timeStamp2) => {
  const timeGap = Math.abs(timeStamp2 - timeStamp1)

  const y = Math.floor(timeGap / 1000 / 60 / 60 / 24 / 365)
  const d = Math.floor((timeGap / 1000 / 60 / 60 / 24) % 365)
  const h = Math.floor((timeGap / 1000 / 60 / 60) % 24)
  const m = Math.floor((timeGap / 1000 / 60) % 60)
  const s = Math.floor((timeGap / 1000) % 60)

  return { y, d, h, m, s }
}

/**
 * 对传入的字符串去除空格
 * @param {String} str
 * @return {String}
 */
const trim = str => str.replace(/\s+/g, '')

/**
 * 生成统一文件名
 * @return {String} 年月日-uuid
 */
const generateFilename = () => {
  const { year, month, day } = transTimeStamp(new Date())
  return year + month + day + '-' + generateUUID()
}

/**
 * 获取文件格式
 * @param {String} filename 文件名
 * @return {String} 返回文件名结尾的格式标识(xxx.jpg --> jpg)
 */
const getFileFormat = filename =>
  filename.substr(filename.lastIndexOf('.') + 1, filename.length)

/**
 * 把url的query数据的格式，转换成Object
 */
const queryToObject = query => {
  query = decodeURIComponent(query)

  let queryObj = {}
  query.split('&').forEach(item => {
    let key = item.split('=')[0],
      value = item.split('=')[1]
    queryObj[key] = value
  })
  return queryObj
}

module.exports = {
  generateUUID,
  getVariableType,
  transCallbackToPromise,
  optionsToString,
  mixinClass,
  transTimeStamp,
  getTimeGap,
  trim,
  generateFilename,
  getFileFormat,
}

/**
 * 阮一峰: 将多个类的接口“混入”（mix in）另一个类
 * @param {Class} 单个或多个类
 * @return {Class} 返回混入后的新类
 */
const mixinClass = (...mixins) => {
  // 拷贝属性方法
  const copyProperties = (target, source) => {
    for (let key of Reflect.ownKeys(source)) {
      if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
        let desc = Object.getOwnPropertyDescriptor(source, key)
        Object.defineProperty(target, key, desc)
      }
    }
  }

  // 混入后的类
  class Mix {
    constructor() {
      mixins.forEach(mixin => copyProperties(this, new mixin())) // 拷贝实例属性
    }
  }
  mixins.forEach(mixin => {
    copyProperties(Mix, mixin) // 拷贝静态属性
    copyProperties(Mix.prototype, mixin.prototype) // 拷贝原型属性
  })

  return Mix
}

export default mixinClass

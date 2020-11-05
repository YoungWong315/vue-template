import Vue from 'vue'
import VueRouter from 'vue-router'
import RouterGuard from './routerGuard'

import home from './home/home'
import about from './about/about'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [...home, ...about],
  scrollBehavior(to, from, savedPosition) {
    // keep-alive 的组件，保留滚动位置
    if (savedPosition && to.meta.keepAlive && to.meta.keepAlive != undefined) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
})

new RouterGuard(router).start()

export default router

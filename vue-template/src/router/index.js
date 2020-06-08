import Vue from 'vue'
import VueRouter from 'vue-router'

import home from './home/home'
import about from './about/about'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [...home, ...about],
})

export default router

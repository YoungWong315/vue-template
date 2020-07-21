class RouterGuard {
  constructor(router) {
    this.router = router
  }
  start() {
    this.beforeEach()
  }
  beforeEach() {
    this.router.beforeEach((to, from, next) => {
      // 修改页面title
      const pageTitle = to.meta && to.meta.title
      if (pageTitle) {
        document.title = pageTitle
      }
      next()
    })
  }
}

export default RouterGuard

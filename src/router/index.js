import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  // ログイン処理
  Router.beforeEach((to, from, next) => {
    const loginUser = localStorage.getItem('user')
    // isPublic でない場合(=認証が必要な場合)、かつ、ログインしていない場合
    if (to.matched.some(record => !record.meta.is_public) && !loginUser) {
      next({ path: '/login', query: { redirect: to.fullPath } })
    } else {
      next()
    }
  })

  return Router
}

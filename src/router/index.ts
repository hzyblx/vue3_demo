import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from '@/router/route.ts'
// 引入icon图标

let router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoute,
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router

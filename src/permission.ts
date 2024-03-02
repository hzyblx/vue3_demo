// 路由守卫
import router from '@/router/index'
// 进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 前置首位
router.beforeEach((to: any, from: any, next: any) => {
  nprogress.start()
  console.log(111)
  next()
})

router.afterEach((to: any, from: any, next: any) => {
  nprogress.done()
})

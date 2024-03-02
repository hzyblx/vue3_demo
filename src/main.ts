import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// svg插件
import 'virtual:svg-icons-register'
// 引入全局组件
import GlobalComponents from '@/components/index'
// 引入全局样式
import '@/styles/indes.scss'
// 引入路由
import router from './router'
// 引入Pinia
import pinia from './store'
// 路由权限
import '@/permission'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
})
app.use(GlobalComponents)
app.use(router)
app.use(pinia)
app.mount('#app')

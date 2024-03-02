import type { App, Component } from 'vue'
import SvgIcons from './SvgIcons/index.vue'
import Paginations from './Paginations/index.vue'
// 引入element图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const globalComponents: { [name: string]: Component } = {
  SvgIcons,
  Paginations,
}
export default {
  install(app: App) {
    // 注册自定义全局组件
    Object.keys(globalComponents).forEach((key) => {
      app.component(key, globalComponents[key])
    })
    // 注册Element-plus Icon组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}

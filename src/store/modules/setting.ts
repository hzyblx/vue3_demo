// 关于Layout组件
import { defineStore } from 'pinia'

let useLayoutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false, //用户折叠菜单状态
      refresh: false, //页面刷新
    }
  },
})

export default useLayoutSettingStore

import axios from 'axios'
import { ElMessage } from 'element-plus'
// 引入用户请求仓库
import useUserStore from '@/store/modules/user.ts'
let request = axios.create({
  // 基础路径  每次请求都会带上 /api
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})

// 请求拦截器
request.interceptors.request.use((config) => {
  let userStore = useUserStore()
  if (userStore.token) {
    config.headers.token = userStore.token
  }

  return config
})

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 成功的回调
    return response.data
  },
  (error) => {
    // 失败的回调
    let msg = ''
    let status = error.response.status
    switch (status) {
      case 401:
        msg = 'token过期'
        break
      case 403:
        msg = '无权访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = '服务器出现问题'
        break
      default:
        msg = '无网络'
    }
    ElMessage({ type: 'error', message: msg })
    return Promise.reject(error)
  },
)

export default request

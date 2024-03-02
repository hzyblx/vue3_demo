// 登录接口传入参数
export interface LoginForm {
  username: string
  password: string
}

// 登录接口局部数据：data
export interface Token {
  token: string
  message: string
}

// 登录接口整体数据
export interface LoginResponse {
  code: number
  data: Token
}

export interface UserDetail {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}

interface UserInfo {
  checkUser: UserDetail
}

export interface UserResponseData {
  code: number
  data: UserInfo
}

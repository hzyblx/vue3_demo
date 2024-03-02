import request from "@/utils/request";
// 类型接口
import type {
  loginFormParams,
  loginResonseData,
  userInfoResponseData,
} from "@/api/user/type";
// 项目用户请求的地址
enum API {
  LOGIN_URL = "/admin/acl/index/login",
  USERINFO_URL = "/admin/acl/index/info",
  LOGOUT_URL = "/admin/acl/index/logout",
}

// 登录接口
export const reqLogin = (data: loginFormParams) =>
  request.post<any, loginResonseData>(API.LOGIN_URL, data);

// 获取用户信息接口
export const reqUserInfo = () =>
  request.get<any, userInfoResponseData>(API.USERINFO_URL);

// 注销用户
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL);

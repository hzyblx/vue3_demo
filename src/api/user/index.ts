import request from "@/utils/request";
import type { LoginForm, LoginResponse, UserResponseData } from "./type";

enum API {
  LOGIN_URL = "/user/login",
  USERINFO_URL = "/user/info",
}

// 登录接口
export const reqLogin = (data: LoginForm) =>
  request.post<any, LoginResponse>(API.LOGIN_URL, data);

// 获取用户信息
export const reqUserInfo = () =>
  request.get<any, UserResponseData>(API.USERINFO_URL);

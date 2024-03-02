// 定义用户相关的ts类型
// 用户登录接口携带参数
export interface loginFormParams {
  username: string;
  password: string;
}

// 所有接口返回的类型
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

// 登录接口返回类型
export interface loginResonseData extends ResponseData {
  data: string;
}

// 获取用户信息返回类型
export interface userInfoResponseData extends ResponseData {
  data: {
    routes: string[];
    buttons: string[];
    roles: string[];
    name: string;
    avater: string;
  };
}

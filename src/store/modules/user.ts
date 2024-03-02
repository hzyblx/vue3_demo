// 创建用户相关的小仓库
import { defineStore } from "pinia";
// 引入接口
import type { LoginResponse } from "@/api/user/type";
// 引入数据类型
import type { UserState } from "@/store/types/userState";
// 引入本地存储token方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
// 引入路由(常量)
import { constantRoute } from "@/router/route.ts";
import { reqUserInfo } from "@/api/user";
let useUserStore = defineStore("User", {
  state(): UserState {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
      username: "",
      avatar: "",
    };
  },
  actions: {
    userLogin(data: LoginResponse) {
      this.token = data.data.token;
      SET_TOKEN(this.token);
    },
    async userInfo() {
      let res = await reqUserInfo();
      if (res.code == 200) {
        this.username = res.data.checkUser.username;
        this.avatar = res.data.checkUser.avatar;

        return "ok";
      } else {
        return Promise.reject("获取用户信息失败");
      }
    },
    userLogout() {
      this.token = "";
      this.username = "";
      this.avatar = "";
      REMOVE_TOKEN();
    },
  },
  getters: {},
});

export default useUserStore;

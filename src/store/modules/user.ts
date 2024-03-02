// 创建用户相关的小仓库
import { defineStore } from "pinia";
// 类型接口
import type { loginResonseData, userInfoResponseData } from "@/api/user/type";
// 引入数据类型
import type { UserState } from "@/store/types/userState";
// 引入本地存储token方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
// 引入路由(常量)
import { constantRoute } from "@/router/route.ts";
import { reqUserInfo, reqLogout } from "@/api/user";
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
    userLogin(res: loginResonseData) {
      this.token = res.data;
      SET_TOKEN(this.token);
    },
    async userInfo() {
      let res: userInfoResponseData = await reqUserInfo();
      if (res.code == 200) {
        this.username = res.data.name;
        this.avatar = res.data.avater;

        return "ok";
      } else {
        return Promise.reject(new Error(res.message));
      }
    },
    async userLogout() {
      let res = await reqLogout();
      if (res.code == 200) {
        this.token = "";
        this.username = "";
        this.avatar = "";
        REMOVE_TOKEN();
        return "ok";
      } else {
        return Promise.reject(new Error(res.message));
      }
    },
  },
  getters: {},
});

export default useUserStore;

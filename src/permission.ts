// 路由守卫
import router from "@/router/index";
// 进度条
import nprogress from "nprogress";
import pinia from "./store";
import "nprogress/nprogress.css";
import useUserStore from "@/store/modules/user.ts";
// 全局配置
import setting from "./setting";
// 取消加载环
nprogress.configure({ showSpinner: false });

let userStore = useUserStore(pinia);

// 前置首位
router.beforeEach(async (to: any, from: any, next: any) => {
  nprogress.start();
  let token = userStore.token;
  let username = userStore.username;
  console.log(username, "username");

  // 有token->已登录
  if (token) {
    // 再去登录，回到首页
    if (to.path == "/login") {
      next({ path: "/" });
    }
    // 去其他路由
    else {
      // 有用户名->token有效->放行
      if (username) {
        next();
      }
      // 无用户名->token失效->重新获取用户信息
      else {
        // 成功获取信息->放行
        try {
          await userStore.userInfo();
          next();
        } catch (error) {
          // token失效
          // 退出登录
          userStore.userLogout();
          // 回到登录页重新登录
          next({ path: "/login", query: { redirect: to.path } });
        }
      }
    }
  }
  // 无token->只能放行登录路由
  else {
    if (to.path == "/login") {
      next();
    } else {
      next({ path: "/login", query: { redirect: to.path } });
    }
  }
});

router.afterEach((to: any, from: any, next: any) => {
  console.log(to, "to");

  document.title = setting.title + "-" + to.meta.title;
  nprogress.done();
});

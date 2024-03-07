<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginFormRef"
        >
          <h1>硅谷甄选</h1>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Unlock"
              v-model="loginForm.password"
              :show-password="true"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="login_btn"
              type="primary"
              size="default"
              :loading="showLoading"
              @click="userLogin"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Unlock } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import useUserStore from "@/store/modules/user";
import { reqLogin } from "@/api/user";
import { useRouter, useRoute } from "vue-router";
import { ElNotification } from "element-plus";
import { getTime } from "@/utils/time";
// 参数类型
import type { loginFormParams } from "@/api/user/type";
// 表单
let loginForm = reactive<loginFormParams>({
  username: "admin",
  password: "111111",
});
let useStore = useUserStore();
let $router = useRouter();
let $route = useRoute();
let showLoading = ref(false);
// 组件ref
let loginFormRef = ref();
// 自定义校验规则
let validateUserName = (_rule: any, value: any, callback: any) => {
  if (value.length >= 5) {
    callback();
  } else {
    callback(new Error("账号长度至少为5位"));
  }
};
let validatePassword = (_rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback();
  } else {
    callback(new Error("密码长度至少为6位"));
  }
};
const rules = {
  username: [{ validator: validateUserName, trigger: "blur" }],
  password: [{ validator: validatePassword, trigger: "blur" }],
};
async function userLogin() {
  // 表单验证
  await loginFormRef.value.validate();
  // 按钮加载中
  showLoading.value = true;
  let result = await reqLogin(loginForm);
  // 按钮取消加载
  showLoading.value = false;
  if (result.code == 200) {
    let redirect: any = $route.query.redirect;
    useStore.userLogin(result);
    $router.push({ path: redirect || "/" });
    ElNotification({
      type: "success",
      message: "欢迎回来!",
      title: `Hi,${getTime()}好`,
    });
  } else {
    ElNotification({ type: "error", message: result.data });
  }
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background-image: url("@/assets/images/background.jpg");
  background-size: cover;
  .login_form {
    position: relative;
    width: 60%;
    top: 30vh;
    padding: 40px;
    background: url("@/assets/images/login_form.png") no-repeat;
    background-size: cover;
    h1 {
      font-size: 40px;
      color: white;
      margin-bottom: 10px;
    }
    .login_btn {
      width: 100%;
    }
  }
}
</style>

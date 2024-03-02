<template>
  <div class="tabber-right">
    <el-button
      icon="Refresh"
      type="primary"
      size="small"
      circle
      @click="getRefresh"
    ></el-button>
    <el-button
      icon="FullScreen"
      type="primary"
      size="small"
      circle
      @click="fullScreen"
    ></el-button>
    <el-button icon="Setting" type="primary" size="small" circle></el-button>
    <img
      :src="userStore.avatar"
      alt=""
      style="width: 24px; height: 24px; margin: 0 12px"
    />
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userStore.username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import useLayoutSettingStore from "@/store/modules/setting";
import useUserStore from "@/store/modules/user";

// import { ref } from 'value'
defineOptions({
  name: "Settings",
});
let LayoutSettingStore = useLayoutSettingStore();
let userStore = useUserStore();
let $router = useRouter();
let $route = useRoute();
function getRefresh() {
  LayoutSettingStore.refresh = !LayoutSettingStore.refresh;
}
function fullScreen() {
  console.log(document.fullscreenElement);
  let full = document.fullscreenElement;
  if (!full) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}
async function logout() {
  await userStore.userLogout();
  $router.push({ path: "/login", query: { redirect: $route.path } });
}
</script>

<style scoped lang="scss"></style>

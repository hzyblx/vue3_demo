<template>
  <div class="layout_container">
    <div class="layout_slider" :class="{ foldSlider: fold }">
      <Logo></Logo>
      <el-menu
        background-color="#001529"
        text-color="white"
        :default-active="$route.path"
        :collapse="fold"
      >
        <Menu :menuList="userStore.menuRoutes"></Menu>
      </el-menu>
    </div>
    <div class="layout_tabbar" :class="{ foldSlider: fold }">
      <Tabbar></Tabbar>
    </div>
    <div class="layout_main" :class="{ foldSlider: fold }"><Main></Main></div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import Logo from '@/layout/logo/index.vue'
import Menu from '@/layout/menu/index.vue'
import Main from '@/layout/main/index.vue'
import Tabbar from './tabbar/index.vue'
import useUserStore from '@/store/modules/user'
import useLayoutSettingStore from '@/store/modules/setting'

defineOptions({
  name: 'Layout',
})
let userStore = useUserStore()
let LayoutSettingStore = useLayoutSettingStore()
let { fold } = toRefs(LayoutSettingStore)
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    color: white;
    background-color: $base-menu-background;
    transition: all 0.3s;
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
    }
    .el-menu {
      border-right: none;
    }

    // 引用父类
    &.foldSlider {
      width: $base-menu-min-width;
    }
  }
  .layout_tabbar {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    transition: all 0.3s;
    // background-image: linear-gradient(to right, white, black, white);
    &.foldSlider {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
  .layout_main {
    position: absolute;
    top: $base-tabbar-height;
    left: $base-menu-width;
    padding: 20px;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    background-color: green;
    overflow: auto; //出现滚动条
    transition: all 0.3s;
    &.foldSlider {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>

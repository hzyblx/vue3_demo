<template>
  <div class="logo_container" v-if="setting.showLogo">
    <img :src="setting.logoUrl" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
// 引入存放logo路径和标题
import setting from '@/setting.ts'
defineOptions({
  name: 'Logo',
})
</script>

<style scoped lang="scss">
.logo_container {
  display: flex;
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  align-items: center;
  padding: 5px;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    margin-left: 10px;
    font-size: $base-menu-logo-font-size;
  }
}
</style>

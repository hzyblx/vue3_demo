<template>
  <div class="tabbar-container">
    <div class="tabber-left"><BrendCrumbs></BrendCrumbs></div>
    <div class="tabber-right"><Settings></Settings></div>
  </div>
</template>

<script setup lang="ts">
import BrendCrumbs from './BrendCrumbs/index.vue'
import Settings from './Settings/index.vue'
defineOptions({
  name: 'Tabbar',
})
</script>

<style scoped lang="scss">
.tabbar-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  .tabber-left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 20px;
  }
  .tabber-right {
    display: flex;
    align-items: center;
  }
}
</style>

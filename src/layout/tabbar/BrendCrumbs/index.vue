<template>
  <div class="tabber-left">
    <el-icon @click="changeIcon" style="margin-right: 10px">
      <component :is="LayoutSettingStore.fold ? 'Expand' : 'Fold'"></component>
    </el-icon>
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item
        v-show="item.meta.title"
        v-for="(item, index) in $route.matched"
        :key="index"
        :to="item.path"
      >
        <div style="display: flex; margin: auto" v-if="item.meta.title">
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span style="margin-left: 3px">{{ item.meta.title }}</span>
        </div>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import useLayoutSettingStore from '@/store/modules/setting'
defineOptions({
  name: 'BrendCrumbs',
})
let $route = useRoute()
// setting仓库
let LayoutSettingStore = useLayoutSettingStore()
// 折叠图标
let changeIcon = () => {
  LayoutSettingStore.fold = !LayoutSettingStore.fold
}
</script>

<style scoped lang="scss"></style>

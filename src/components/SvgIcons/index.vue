<template>
  <div>1111</div>
  <svg>
    <use :xlink:href="prefix + name"></use>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  // 图标属性前缀
  prefix: {
    type: String,
    default: '#icon-',
  },
  // 图标名字
  name: String,
})
</script>

<style scoped></style>

<template>
  <div>home</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useUserStore from '@/store/modules/user.ts'
let userStore = useUserStore()
onMounted(() => {
  userStore.userInfo()
})
</script>

<style scoped></style>

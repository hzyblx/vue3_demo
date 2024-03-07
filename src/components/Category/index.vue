<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select
          style="width: 240px"
          v-model="categoryStore.c1Id"
          @change="changeSelectOne"
        >
          <el-option
            v-for="c1 in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option> </el-select
      ></el-form-item>
      <el-form-item label="二级分类">
        <el-select
          style="width: 240px"
          v-model="categoryStore.c2Id"
          @change="changeSelectTwo"
        >
          <el-option
            v-for="c2 in categoryStore.c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option> </el-select
      ></el-form-item>
      <el-form-item label="三级分类">
        <el-select style="width: 240px" v-model="categoryStore.c3Id">
          <el-option
            v-for="c3 in categoryStore.c3Arr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option> </el-select
      ></el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
// 引入商品分类仓库
import useCategoryStore from "@/store/modules/category";
let categoryStore = useCategoryStore();

defineOptions({
  name: "Category",
});

async function changeSelectOne() {
  categoryStore.c2Id = "";
  categoryStore.getC2();
  categoryStore.c3Id = "";
  categoryStore.c3Arr = [];
}
async function changeSelectTwo() {
  categoryStore.c3Id = "";
  categoryStore.getC3();
}
onMounted(() => {
  categoryStore.getC1();
});
</script>

<style scoped></style>

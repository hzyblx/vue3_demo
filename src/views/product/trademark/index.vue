<template>
  <div>
    <el-card class="box-card">
      <!-- 卡片顶部按钮 -->
      <el-button type="primary" size="default" icon="Plus" @click=""
        >添加品牌</el-button
      >
      <!-- 表格 -->
      <el-table :data="tableData" style="margin: 10px 0" border>
        <el-table-column
          type="index"
          :index="tableIndex"
          label="序号"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column prop="tmName" label="品牌名称" align="center">
        </el-table-column>
        <el-table-column prop="date" label="品牌logo" align="center">
          <template #="{ row, $index }">
            <img
              :src="row.logoUrl"
              onerror="this.src='/public/logo.svg'"
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作" align="center">
          <template #="{ row }">
            <el-button
              type="primary"
              size="small"
              @click=""
              icon="Edit"
            ></el-button>
            <el-button
              type="primary"
              size="small"
              @click=""
              icon="Delete"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 10]"
      :pager-count="7"
      layout=" prev, pager, next,jumper,sizes,total"
      :total="totalPage"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { reqHasTradeMark } from "@/api/product/trademark";
import { Records, TradeMarkResponseData } from "@/api/product/trademark/type";

// 表格数据
let tableData = ref<Records>([]);
// 当前页
let currentPage = ref<number>(1);
// 页面大小
let pageSize = ref<number>(3);
// 总共条数
let totalPage = ref<number>(0);
// 序号自增
let tableIndex = (index: number) => {
  return (currentPage.value - 1) * pageSize.value + index + 1;
};
// 修改每页页数回调
function handleSizeChange(size: number) {
  pageSize.value = size;
  handleCurrentChange();
}
// 点击页数的回调
function handleCurrentChange(val: number = 1) {
  currentPage.value = val;
  getTradeMark();
}
// 获取已有品牌
async function getTradeMark() {
  let res: TradeMarkResponseData = await reqHasTradeMark(
    currentPage.value,
    pageSize.value
  );
  console.log(res);

  if (res.code == 200) {
    tableData.value = res.data.records;
    totalPage.value = res.data.total;
  }
}
onMounted(() => {
  getTradeMark();
});
</script>

<style scoped lang="scss">
.el-pagination {
  margin-top: 10px;
  justify-content: center;
}
</style>

<template>
  <div>
    <Category :screen="screen"></Category>
    <el-card style="margin: 10px 0">
      <div v-show="screen == 0">
        <el-button
          type="primary"
          :disabled="!categoryStore.c3Id"
          @click="addSpu"
          >添加SPU</el-button
        >
        <el-table :data="tableList" style="margin: 10px 0" border>
          <el-table-column
            label="序号"
            type="index"
            :index="tableIndex"
            align="center"
            width="80"
          ></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column
            label="SPU描述"
            prop="description"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作">
            <template #="{ row }">
              <el-button
                type="primary"
                icon="Plus"
                title="添加SKU"
                @click="addSKU(row)"
              ></el-button>
              <el-button
                type="warning"
                icon="Edit"
                title="修改SPU"
                @click="updateSPU(row)"
              ></el-button>
              <el-button
                type="info"
                icon="View"
                title="查看SKU列表"
                @click="readSKU(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="Delete"
                title="删除SPU"
                @click="deleteSPU(row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5, 7, 9]"
          :pager-count="7"
          layout=" prev, pager, next,jumper,sizes,total"
          :total="total"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <!-- 添加||修改SPU -->
      <SpuForm
        ref="spuForm"
        v-show="screen == 1"
        @change-screen="spuCancle"
      ></SpuForm>
      <!-- 添加SKU -->
      <SkuForm v-show="screen == 2"></SkuForm>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from "vue";
import useCategoryStore from "@/store/modules/category"; // 商品分类仓库
import { reqHasSPU } from "@/api/product/spu/index"; //SPU接口
import type { SpuRecords, SpuResonseData } from "@/api/product/spu/type";
import SkuForm from "@/views/product/spu/skuForm.vue";
import SpuForm from "@/views/product/spu/spuForm.vue";
let categoryStore = useCategoryStore();
let screen = ref<number>(1); //0展示SPU列表   1展示添加或者修改SPU  2展示添加SKU
// 当前页
let currentPage = ref<number>(1);
// 页大小
let pageSize = ref<number>(3);
// 总个数
let total = ref<number>(0);
// 表格数据
let tableList = ref<SpuRecords[]>([]);
// 序号自增
let tableIndex = (index: number) => {
  return (currentPage.value - 1) * pageSize.value + index + 1;
};
// 获取组件spuForm实例
let spuForm = ref<any>();

// 每页大小回调
let handleSizeChange = (val: number) => {
  pageSize.value = val;
  handleCurrentChange();
};
// 选中页数回调
let handleCurrentChange = (val: number = 1) => {
  currentPage.value = val;
  getSpuList();
};

// 监听三级分类ID
watch(
  () => categoryStore.c3Id,
  (newVal) => {
    // 三级分类ID存在时才获取
    if (!newVal) return;
    getSpuList();
  }
);
// 获取Spu列表
async function getSpuList(type: string = "修改") {
  if (type == "新增") {
    currentPage.value = 1;
  } else if (type == "删除") {
    currentPage.value = Math.ceil((total.value - 1) / pageSize.value);
  }
  const { c3Id } = categoryStore;
  let res: SpuResonseData = await reqHasSPU(
    currentPage.value,
    pageSize.value,
    c3Id
  );
  if (res.code == 200) {
    tableList.value = res.data.records;
    total.value = res.data.total;
  }
}
// 添加Spu
function addSpu() {
  screen.value = 1;
  spuForm.value.initAddSpuForm(categoryStore.c3Id);
}
// 添加SKU
function addSKU(row: any) {
  screen.value = 2;
}
// 修改SPU
function updateSPU(row: SpuRecords) {
  screen.value = 1;
  // 子组件方法
  let data = JSON.parse(JSON.stringify(row));
  spuForm.value.initHasSpuData(data);
}
// 查看SKU
function readSKU(row: any) {}
// 删除SPU
function deleteSPU(row: any) {}
// SPU组件取消回调
function spuCancle(val: number, type: string = "") {
  screen.value = val;
  if (type) getSpuList(type);
}

// 在销毁前
onBeforeUnmount(() => {
  // 清空仓库
  categoryStore.$reset();
});
</script>

<style scoped lang="scss">
.el-pagination {
  margin-top: 10px;
  justify-content: center;
}
</style>

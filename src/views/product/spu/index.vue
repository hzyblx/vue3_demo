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
              <el-popconfirm
                width="220"
                confirm-button-text="OK"
                cancel-button-text="不了"
                icon="InfoFilled"
                icon-color="#626AEF"
                :title="`确定要删除${row.spuName}吗？`"
                @confirm="deleteSPU(row)"
                confirm-button-type="success"
                cancel-button-type="danger"
              >
                <template #reference>
                  <el-button type="primary" icon="Delete"> </el-button>
                </template>
              </el-popconfirm>
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
      <SkuForm
        ref="skuForm"
        v-show="screen == 2"
        @change-screen="skuCancle"
      ></SkuForm>
      <!--  -->
      <el-dialog v-model="showSkuDetail" title="Sku详情">
        <el-table :data="skuList" v-loading="skuDetailLoading" border>
          <el-table-column prop="skuName" label="名称"></el-table-column>
          <el-table-column prop="price" label="价格"></el-table-column>
          <el-table-column prop="weight" label="重量"></el-table-column>
          <el-table-column prop="skuNamskuDesce" label="描述"></el-table-column>
          <el-table-column prop="skuName" label="图片">
            <template #="{ row }">
              <img
                :src="row.skuDefaultImg"
                alt="加载失败"
                style="height: 100px; width: 100px"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount, reactive } from "vue";
import useCategoryStore from "@/store/modules/category"; // 商品分类仓库
import {
  reqGetSkuDetail,
  reqHasSPU,
  reqDeleteSpu,
} from "@/api/product/spu/index"; //SPU接口
import type {
  SpuRecords,
  SpuResonseData,
  SkuDetailObj,
} from "@/api/product/spu/type";
import SkuForm from "@/views/product/spu/skuForm.vue";
import SpuForm from "@/views/product/spu/spuForm.vue";
import { ElMessage } from "element-plus";
let categoryStore = useCategoryStore();
let screen = ref<number>(0); //0展示SPU列表   1展示添加或者修改SPU  2展示添加SKU
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
let skuForm = ref<any>();
// sku详情列表
let skuList = reactive<SkuDetailObj[]>([]);
let showSkuDetail = ref<boolean>(false);
let skuDetailLoading = ref<boolean>(false);
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
    // 根据新页数和旧页数进行对比，小于则返回前一页
    let newTotalPage = Math.ceil((total.value - 1) / pageSize.value);
    if (newTotalPage < currentPage.value)
      currentPage.value = Math.max(newTotalPage, 1);
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
function addSKU(row: SpuRecords) {
  screen.value = 2;
  console.log(row);
  let params = {
    c1Id: categoryStore.c1Id,
    c2Id: categoryStore.c2Id,
    c3Id: categoryStore.c3Id,
    spu: row,
  };
  skuForm.value.initSkuForm(params);
}
// 修改SPU
function updateSPU(row: SpuRecords) {
  screen.value = 1;
  // 子组件方法
  let data = JSON.parse(JSON.stringify(row));
  spuForm.value.initHasSpuData(data);
}
// 查看SKU
async function readSKU(row: SpuRecords) {
  showSkuDetail.value = true;
  skuDetailLoading.value = true;
  let res = await reqGetSkuDetail(row.id as number);
  skuDetailLoading.value = false;
  if (res.code == 200) {
    skuList = res.data;
  }
}
// 删除SPU
async function deleteSPU(row: SpuRecords) {
  let res: any = await reqDeleteSpu(row.id as number);
  if (res.code == 200) {
    ElMessage.success("删除SPU成功");
    getSpuList("删除");
  } else {
    ElMessage.error("删除SPU失败");
  }
}
// SPU组件取消回调
function spuCancle(val: number, type: string = "") {
  screen.value = val;
  if (type) getSpuList(type);
}
// SKU组件取消回调
function skuCancle(val: number) {
  screen.value = val;
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

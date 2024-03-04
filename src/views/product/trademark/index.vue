<template>
  <div>
    <el-card class="box-card">
      <!-- 卡片顶部按钮 -->
      <el-button type="primary" size="default" icon="Plus" @click="addTrademark"
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
              @click="updateTrademark(row)"
              icon="Edit"
            ></el-button>

            <el-popconfirm
              width="220"
              confirm-button-text="OK"
              cancel-button-text="不了"
              icon="InfoFilled"
              icon-color="#626AEF"
              :title="`确定要删除${row.tmName}吗？`"
              @confirm="deleteTrademark(row)"
              confirm-button-type="success"
              cancel-button-type="danger"
            >
              <template #reference>
                <el-button type="primary" size="small" icon="Delete">
                </el-button>
              </template>
            </el-popconfirm>
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
    <Dialog
      :dialogFormVisible="dialogFormVisible"
      :title="dialogTitle"
      :trademarkEdit="editTrademark"
      @getAfterUpdate="getTradeMark"
      @closeDialog="closeDialog"
    ></Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { reqHasTradeMark, reqDeleteTradeMark } from "@/api/product/trademark";
import {
  Records,
  TradeMarkResponseData,
  TradeMark,
} from "@/api/product/trademark/type";
import Dialog from "@/views/product/trademark/dialog.vue";
import { ElMessage } from "element-plus";
// 对话框展示
let dialogFormVisible = ref<boolean>(false);
// 对话框标题
let dialogTitle = ref<string>("");
// 表格数据
let tableData = ref<Records>([]);
// 当前页
let currentPage = ref<number>(1);
// 页面大小
let pageSize = ref<number>(3);
// 总共条数
let totalPage = ref<number>(0);
// 编辑的品牌
let editTrademark = ref<Object>({});
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
async function getTradeMark(type: string = "修改") {
  // 新增条件下,跳转到最有一页
  if (type == "新增") {
    currentPage.value = Math.ceil((totalPage.value + 1) / pageSize.value);
  } else if (type == "删除") {
    currentPage.value = Math.ceil((totalPage.value - 1) / pageSize.value);
  }
  let res: TradeMarkResponseData = await reqHasTradeMark(
    currentPage.value,
    pageSize.value
  );

  if (res.code == 200) {
    tableData.value = res.data.records;
    totalPage.value = res.data.total;
  }
}
// 添加品牌按钮回调
function addTrademark() {
  dialogFormVisible.value = true;
  dialogTitle.value = "添加品牌";
}
// 修改品牌
function updateTrademark(row: TradeMark) {
  dialogFormVisible.value = true;
  dialogTitle.value = "修改品牌";
  editTrademark.value = row;
}
// 删除品牌
async function deleteTrademark(row: TradeMark) {
  let res = await reqDeleteTradeMark(row.id as number);
  if (res.code == 200) {
    ElMessage.success("删除成功");
    getTradeMark("删除");
  } else {
    ElMessage.error("删除失败");
  }
}
// 关闭对话框回调
function closeDialog() {
  dialogFormVisible.value = false;
  editTrademark.value = {};
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

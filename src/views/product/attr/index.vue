<template>
  <div>
    <Category></Category>
    <el-card style="margin: 10px 0">
      <el-button
        v-if="showAllFlag"
        type="primary"
        icon="Plus"
        :disabled="!categoryStore.c3Id"
        @click="addAttr"
        >添加平台属性</el-button
      >
      <div v-if="showAllFlag">
        <el-table :data="attrTable" border>
          <el-table-column
            label="序号"
            type="index"
            width="80"
          ></el-table-column>
          <el-table-column
            label="属性名称"
            prop="attrName"
            width="120"
          ></el-table-column>
          <el-table-column label="属性值名称" prop="">
            <template #="{ row }">
              <el-tag
                style="margin: 3px"
                v-for="attr in row.attrValueList"
                :key="attr.attrId"
                >{{ attr.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template #="{ row }">
              <el-button
                icon="Edit"
                type="primary"
                size="small"
                @click="EditAttr(row)"
              ></el-button>
              <el-button
                icon="Delete"
                type="primary"
                size="small"
                @click="DeleteAttr(row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else>
        <el-form>
          <el-form-item label="属性名称：" style="width: 300px">
            <el-input
              placeholder="请输入属性名称"
              v-model="attrParams.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          icon="Plus"
          type="primary"
          :disabled="!attrParams.attrName || isRepeat"
          @click="addAttrValue"
          >添加属性值</el-button
        >
        <el-button>取消</el-button>
        <el-table border :data="attrParams.attrValueList"
          ><el-table-column
            label="序号"
            type="index"
            width="80px"
          ></el-table-column
          ><el-table-column label="属性值" prop>
            <template #="{ row, $index }">
              <el-input
                v-if="!row.lookFlag"
                :ref="(vc: any) => (inputArr[$index] = vc)"
                v-model="row.valueName"
                placeholder="请输入属性名称"
                @blur="toLook(row, $index)"
              >
              </el-input>
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template> </el-table-column
          ><el-table-column
            label="操作"
            width="120px
          "
          >
            <template #="{ $index }">
              <el-button
                icon="Delete"
                type="danger"
                @click="DeleteAttr($index)"
              ></el-button>
            </template> </el-table-column
        ></el-table>
        <el-button
          type="primary"
          @click="saveAttrValue"
          :disabled="attrParams.attrValueList.length > 0 ? false : true"
          >保存</el-button
        >
        <el-button @click="cancalEdit">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch, nextTick } from "vue";
import useCategoryStore from "@/store/modules/category";
import { reqAttr, reqAddOrUpdateAttr } from "@/api/product/attr";
import type {
  AttrResponseData,
  attrDataObj,
  AttrValueObj,
} from "@/api/product/attr/type";
import { ElMessage } from "element-plus";

let categoryStore = useCategoryStore();
// 属性表格
let attrTable = ref<attrDataObj[]>([]);
// 表格和新增切换
let showAllFlag = ref<boolean>(true);
// 表格新增或编辑参数
let attrParams = reactive<attrDataObj>({
  id: "", // 已有属性ID
  attrName: "", // 属性名称
  categoryId: "", //三级分类ID
  categoryLevel: 3,
  attrValueList: [],
});
// 重复判断
let isRepeat = ref<boolean>(false);
// 存入输入框元素
let inputArr = ref<any>([]);

watch(
  () => categoryStore.c3Id,
  async (val) => {
    // 删除上次遗留的数据
    attrTable.value = [];
    // c3Id不为空时，才获取表格数据
    if (!val) return;
    getAttr();
  }
);

// 获取属性列表数据
async function getAttr() {
  const { c1Id, c2Id, c3Id } = categoryStore;
  let res: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id);
  if (res.code == 200) {
    attrTable.value = res.data;
  }
}

// 编辑属性接口
async function addOrUpdateAttr(row: attrDataObj) {
  let res = await reqAddOrUpdateAttr(row);
}

// 新增属性
function addAttr() {
  showAllFlag.value = false;
  Object.assign(attrParams, {
    id: "", // 已有属性ID
    attrName: "", // 属性名称
    categoryId: "", //三级分类ID
    categoryLevel: categoryStore.c3Id,
    attrValueList: [],
  });
  // 保存三级分类ID
}

// 保存属性
async function saveAttrValue() {
  let res: any = await reqAddOrUpdateAttr(attrParams);
  if (res.code == 200) {
    ElMessage.success(`${attrParams.categoryId ? "添加" : "编辑"}属性成功`);
    showAllFlag.value = true;
    // 重新获取属性列表
    getAttr();
  } else {
    ElMessage.error(`${attrParams.categoryId ? "添加" : "编辑"}属性失败`);
  }
}

// 新增属性值列表
function addAttrValue() {
  attrParams.attrValueList.push({ valueName: "", lookFlag: false });
  // 聚焦
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus();
  });
}

// 删除属性
async function DeleteAttr(index: number) {
  attrParams.attrValueList.splice(index, 1);
}

// 编辑属性
async function EditAttr(row: attrDataObj) {
  showAllFlag.value = false;
  addOrUpdateAttr(row);
}

// 取消编辑
function cancalEdit() {
  showAllFlag.value = true;
}

// 变成查看模式
function toLook(row: AttrValueObj, index: number) {
  isRepeat.value = false;
  // 输入框为空
  if (row.valueName.trim() == "") {
    ElMessage.error("属性值不能为空");
    // 删除当前项
    attrParams.attrValueList.splice(index, 1);
    return;
  }
  // 重复
  isRepeat.value = attrParams.attrValueList.some((item) => {
    if (item != row) {
      return item.valueName == row.valueName;
    }
    return false;
  });

  if (isRepeat.value) {
    ElMessage.error("属性值不能重复");
    return;
  }
  row.lookFlag = true;
}

// 变成编辑模式
function toEdit(row: AttrValueObj, index: number) {
  row.lookFlag = false;
  // 由于是v-if显示隐藏输入框,导致元素会更新,需要采用nextTick才能获取到元素
  nextTick(() => {
    // 聚焦
    inputArr.value[index].focus();
  });
}
</script>

<style scoped></style>

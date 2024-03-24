<template>
  <div>
    <el-form :rules="rules" :model="skuParams" :inline="true">
      <el-form-item label="sku名称" prop="skuName">
        <el-input placeholder="SKU名称" v-model="skuParams.skuName"></el-input
      ></el-form-item>
      <el-form-item label="价格(元)" prop="price">
        <el-input placeholder="价格(元)" v-model="skuParams.price"> </el-input>
      </el-form-item>
      <el-form-item label="重量(克)" prop="weight">
        <el-input placeholder="重量(克)" v-model="skuParams.weight"></el-input
      ></el-form-item>
      <el-form-item label="sku描述" prop="skuDesc" style="width: 100%">
        <el-input placeholder="sku描述" v-model="skuParams.skuDesc"></el-input
      ></el-form-item>
      <el-form-item label="平台属性">
        <el-form inline>
          <el-form-item
            v-for="item in attrList"
            :label="item.attrName"
            :key="item.id"
          >
            <el-select style="width: 250px" v-model="item.attrIdAndValueId">
              <el-option
                v-for="attr in item.attrValueList"
                :key="attr.attrId"
                :label="attr.valueName"
                :value="`${item.id}:${attr.id}`"
              ></el-option> </el-select
          ></el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form inline>
          <el-form-item
            v-for="item in saleList"
            :key="item.id"
            :label="item.saleAttrName"
          >
            <el-select style="width: 250px" v-model="item.saleIdAndValueId">
              <el-option
                v-for="sale in item.spuSaleAttrValueList"
                :key="sale.id"
                :label="sale.saleAttrValueName"
                :value="`${item.id}:${sale.id}`"
              ></el-option> </el-select
          ></el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table border :data="imgList" ref="table">
          <el-table-column
            type="selection"
            width="80px"
            align="center"
          ></el-table-column>
          <el-table-column label="图片">
            <template #="{ row }">
              <img
                :src="row.imgUrl"
                alt="图片加载失败"
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>

          <el-table-column label="名称" prop="imgName"></el-table-column>
          <el-table-column label="操作">
            <template #="{ row }">
              <el-button type="primary" size="small" @click="setPrimary(row)"
                >设置默认</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-form-item style="margin: 10px 0">
          <el-button type="info" @click="cancel">取消</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </el-form-item>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { reqAttr } from "@/api/product/attr";
import {
  reqGetSpuImage,
  reqGetSaleAttrList,
  reqAddSku,
} from "@/api/product/spu";
import type { SpuRecords, SkuParams } from "@/api/product/spu/type";
import { ElMessage } from "element-plus";
let attrList = ref<any>([]);
let saleList = ref<any>([]);
let imgList = ref<any>([]);
let table = ref<any>();
let $emit = defineEmits(["changeScreen"]);
const cancel = () => $emit("changeScreen", 0);

// 校验规则
const rules = reactive<any>({
  skuName: [
    { required: true, message: "请输入名称", trigger: "blur" },
    { min: 3, max: 8, message: "长度为3到8", trigger: "blur" },
  ],
  price: [
    {
      required: true,
      message: "请输入价格",
      trigger: "blur",
    },
  ],
  weight: [
    {
      required: true,
      message: "请输入重量",
      trigger: "blur",
    },
  ],
  skuDesc: [{ required: true, message: "请输入描述", trigger: "blur" }],
});

let skuParams = reactive<SkuParams>({
  // 父组件传来的
  category3Id: "",
  spuId: "",
  tmId: "",
  // 该组件收集的
  skuName: "",
  price: "",
  weight: "",
  skuDesc: "",
  skuDefaultImg: "",
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
});

const initSkuForm = async ({
  c1Id,
  c2Id,
  c3Id,
  spu,
}: {
  c1Id: number | string;
  c2Id: number | string;
  c3Id: number | string;
  spu: SpuRecords;
}) => {
  Object.assign(skuParams, {
    category3Id: "",
    spuId: "",
    tmId: "",
    skuName: "",
    price: "",
    weight: "",
    skuDesc: "",
    skuDefaultImg: "",
    skuAttrValueList: [],
    skuSaleAttrValueList: [],
  });
  skuParams.category3Id = spu.category3Id;
  skuParams.spuId = spu.id as number;
  skuParams.tmId = spu.tmId as number;
  // 获取平台属性
  let resAttr = await reqAttr(c1Id, c2Id, c3Id);
  // 获取销售属性
  let resSale = await reqGetSaleAttrList(spu.id as number);
  // 获取图片
  let resImg = await reqGetSpuImage(spu.id as number);

  attrList.value = resAttr.data;
  saleList.value = resSale.data;
  imgList.value = resImg.data;
  console.log(resImg);
};
// 设置默认图片
let setPrimary = (row: any) => {
  table.value.clearSelection();
  table.value.toggleRowSelection(row, true);
  skuParams.skuDefaultImg = row.imgUrl;
  console.log(row);
};
let save = async () => {
  // 平台属性
  let attrArr = attrList.value.reduce((prev: any, next: any) => {
    if (next.attrIdAndValueId) {
      let [attrId, valueId] = next.attrIdAndValueId.split(":");
      prev.push({ attrId, valueId });
    }
    return prev;
  }, []);
  let saleArr = saleList.value.reduce((prev: any, next: any) => {
    if (next.saleIdAndValueId) {
      let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(":");
      prev.push({ saleAttrId, saleAttrValueId });
    }
    return prev;
  }, []);
  skuParams.skuAttrValueList = attrArr;
  skuParams.skuSaleAttrValueList = saleArr;
  let res: any = await reqAddSku(skuParams);
  if (res.code == 200) {
    ElMessage.success("添加Sku成功");
    $emit("changeScreen", 0);
  } else {
    ElMessage.error("添加Sku失败");
  }
};

defineExpose({ initSkuForm });
</script>

<style scoped></style>

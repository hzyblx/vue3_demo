<template>
  <div>
    <el-form label-width="120px">
      <el-form-item label="SPU名称" placeholder="请你输入SPU名称"
        ><el-input v-model="spu.name"></el-input
      ></el-form-item>
      <el-form-item label="SPU品牌"
        ><el-select style="width: 240px" v-model="selectTrademark"
          ><el-option
            v-for="trade in trademarkList"
            :label="trade.tmName"
            :value="trade.id"
            :key="trade.id"
          ></el-option></el-select
      ></el-form-item>
      <el-form-item label="SPU描述"
        ><el-input
          v-model="spu.description"
          type="textarea"
          placeholder="请你输入SPU描述"
        ></el-input
      ></el-form-item>
      <el-form-item label="SPU照片">
        <el-upload
          v-model:file-list="imageList"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="SPU销售属性"
        ><el-select style="width: 240px" v-model="selectSaleAttr"
          ><el-option
            v-for="base in baseAttrList"
            :value="base.id"
            :key="base.id"
            :label="base.name"
          ></el-option
        ></el-select>
        <el-button icon="Plus" type="primary" style="margin-left: 10px"
          >添加销售属性</el-button
        >
        <el-table border style="margin: 10px 0" :data="saleAttrList">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column
            label="销售属性名称"
            width="120px"
            prop="saleAttrName"
          ></el-table-column>
          <el-table-column
            label="销售属性值"
            prop="saleAttrValueName"
          ></el-table-column>
          <el-table-column label="操作" prop="" width="200px">
            <template #="{ row }">
              <el-button size="small" icon="Plus" type="primary"
                >保存</el-button
              >
              <el-button size="small" icon="Delete" type="danger"
                >取消</el-button
              ></template
            >
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="cancle">取消</el-button>
        <el-button type="primary" @click="cancle">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { UploadProps, UploadUserFile } from "element-plus";
import type {
  SpuRecords,
  TrademarkRespnseData,
  SpuImageRespnseData,
  SpuImage,
  Trademark,
  SpuSaleAttrResponseData,
  SpuSaleAttr,
  SpuSaleAttrValue,
  SpuBaseAttrValue,
  SpuBaseAttrResponseData,
} from "@/api/product/spu/type";
import {
  reqGetTrademark,
  reqGetSpuImage,
  reqGetSaleAttrList,
  reqGetBaseAttrList,
} from "@/api/product/spu/index";
// 名称和描述
let $emit = defineEmits(["changeScreen"]);
let spu = ref({
  name: "",
  description: "",
});
interface image {
  name: string;
  url: string;
}
// 选中品牌
let selectTrademark = ref<number>();
// 选中销售属性
let selectSaleAttr = ref<number>();
// 品牌列表
let trademarkList = ref<Trademark[]>([]);
// 图片列表
let imageList = ref<image[]>([]);
// 销售属性
let saleAttrList = ref<SpuSaleAttr[]>([]);

// 基础属性
let baseAttrList = ref<SpuBaseAttrValue[]>([]);

const fileList = ref<UploadUserFile[]>([]);
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};
const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};
// 取消按钮
const cancle = () => {
  $emit("changeScreen", 0);
};
async function initHasSpuData(data: SpuRecords) {
  let { id } = data;
  spu.value.name = data.spuName;
  spu.value.description = data.description;
  getTrademarkList();
  getImageList(id);
  getSaleAttrList(id);
  getBaseAttrList();
}
// 获取商品品牌
async function getTrademarkList() {
  let res: TrademarkRespnseData = await reqGetTrademark();
  if (res.code == 200) {
    trademarkList.value = res.data;
  }
}
// 获取商品图片
async function getImageList(id: number) {
  let res: SpuImageRespnseData = await reqGetSpuImage(id);
  if (res.code == 200) {
    imageList.value = res.data.map((item) => {
      return { name: item.imgName, url: item.imgUrl };
    });
  }
}
// 获取商品销售属性
async function getSaleAttrList(id: number) {
  let res: SpuSaleAttrResponseData = await reqGetSaleAttrList(id);
  if (res.code == 200) {
    saleAttrList.value = res.data;
    console.log(res);
  }
}
// 获取商品基础属性
async function getBaseAttrList() {
  let res: SpuBaseAttrResponseData = await reqGetBaseAttrList();
  if (res.code == 200) {
    baseAttrList.value = res.data;
  }
}
// 对外暴露
defineExpose({ initHasSpuData });
</script>

<style scoped></style>

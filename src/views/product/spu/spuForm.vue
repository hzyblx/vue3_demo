<template>
  <div>
    <el-form label-width="120px">
      <el-form-item label="SPU名称" placeholder="请你输入SPU名称"
        ><el-input v-model="spuParams.spuName"></el-input
      ></el-form-item>
      <el-form-item label="SPU品牌"
        ><el-select style="width: 240px" v-model="spuParams.tmId"
          ><el-option
            v-for="trade in trademarkList"
            :label="trade.tmName"
            :value="trade.id"
            :key="trade.id"
          ></el-option></el-select
      ></el-form-item>
      <el-form-item label="SPU描述"
        ><el-input
          v-model="spuParams.description"
          type="textarea"
          placeholder="请你输入SPU描述"
        ></el-input
      ></el-form-item>
      <el-form-item label="SPU照片">
        <el-upload
          v-model:file-list="imageList"
          action="/api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :before-upload="beforeUpload"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img
            w-full
            :src="dialogImageUrl"
            alt="Preview Image"
            style="width: 100%; height: 100%"
          />
        </el-dialog>
      </el-form-item>
      <el-form-item label="SPU销售属性"
        ><el-select
          style="width: 240px"
          v-model="selectSaleAttr"
          :placeholder="`还未选择${unSelectedAttr.length}项`"
          ><el-option
            v-for="base in unSelectedAttr"
            :value="`${base.id}:${base.name}`"
            :key="base.id"
            :label="base.name"
          ></el-option
        ></el-select>
        <el-button
          icon="Plus"
          type="primary"
          style="margin-left: 10px"
          @click="addSaleAttr"
          :disabled="!selectSaleAttr"
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
          >
          </el-table-column>
          <el-table-column label="销售属性值" prop="saleAttrValueName">
            <template #="{ row }">
              <el-tag
                v-for="(tag, $index) in row.spuSaleAttrValueList"
                :key="tag.id"
                closable
                :disable-transitions="false"
                @close="handleClose(row, $index)"
                style="margin-right: 5px"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                v-if="row.flag"
                ref="InputRef"
                v-model="row.input"
                class="w-20"
                size="small"
                style="width: 100px"
                @keyup.enter="handleInputConfirm(row)"
                @blur="handleInputConfirm(row)"
              />
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput(row)"
              >
                +添加
              </el-button>
            </template></el-table-column
          >
          <el-table-column label="操作" prop="" width="200px">
            <template #="{ $index }">
              <el-button
                size="small"
                icon="Delete"
                type="danger"
                @click="deleteAttrValue($index)"
                >删除</el-button
              ></template
            >
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="cancle">取消</el-button>
        <el-button
          type="primary"
          @click="saveInfo"
          :disabled="!(saleAttrList.length > 0)"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, computed } from "vue";
import type { UploadProps, UploadUserFile, UploadRawFile } from "element-plus";
import { ElMessage, ElInput } from "element-plus";
import type {
  SpuRecords,
  TrademarkRespnseData,
  SpuImageRespnseData,
  SpuImage,
  Trademark,
  SpuSaleAttrResponseData,
  SpuSaleAttr,
  SpuBaseAttrValue,
  SpuBaseAttrResponseData,
} from "@/api/product/spu/type";
import {
  reqGetTrademark,
  reqGetSpuImage,
  reqGetSaleAttrList,
  reqGetBaseAttrList,
  reqAddOrUpdateSpu,
} from "@/api/product/spu/index";
// 名称和描述
let $emit = defineEmits(["changeScreen"]);

let spuParams = ref<SpuRecords>({
  category3Id: 0, //三级分类ID
  id: null, //SPU ID
  description: "", // SPU描述
  spuName: "", // SPU名称
  tmId: null, // 品牌ID
  spuImageList: null,
  spuSaleAttrList: null,
});
// 选中销售属性
let selectSaleAttr = ref<string>("");
// 品牌列表
let trademarkList = ref<Trademark[]>([]);
// 图片列表
let imageList = ref<SpuImage[]>([]);
// 销售属性
let saleAttrList = ref<SpuSaleAttr[]>([]);
// 基础属性
let baseAttrList = ref<SpuBaseAttrValue[]>([]);

const dialogImageUrl = ref("");
const dialogVisible = ref(false);

const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};
// 上传图片前 限制图片
const beforeUpload = (rawFile: UploadRawFile) => {
  let typeArr = ["image/png", "image/jpg", "image/gif"];
  if (typeArr.indexOf(rawFile.type) == -1) {
    ElMessage.error("上传格式务必为jpg||png||gif");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 4) {
    ElMessage.error("文件大小不能大于4MB!");
    return false;
  }
  return true;
};

const InputRef = ref<InstanceType<typeof ElInput>>();
// 添加销售属性
const addSaleAttr = () => {
  // 品牌ID   品牌名称
  let [baseSaleAttrId, saleAttrName] = selectSaleAttr.value.split(":");
  let newSpuAttr = {
    baseSaleAttrId: parseInt(baseSaleAttrId),
    saleAttrName,
    spuSaleAttrValueList: [],
  };
  // 添加对象
  saleAttrList.value.push(newSpuAttr);
  // 清除选择属性
  selectSaleAttr.value = "";
};

// 删除tag
const handleClose = (row: SpuSaleAttr, index: number) => {
  row.spuSaleAttrValueList.splice(index, 1);
};

// 点击tag
const showInput = (row: SpuSaleAttr) => {
  // 编辑模式
  row.flag = true;
  row.input = "";
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
};
// 提交tag
const handleInputConfirm = (row: SpuSaleAttr) => {
  let tagObj = {
    baseSaleAttrId: row.baseSaleAttrId,
    saleAttrValueName: row.input as string,
  };
  // 判断是否重复
  let isRepeat = row.spuSaleAttrValueList.some(
    (item) => item.saleAttrValueName == row.input
  );
  // 空
  if (!tagObj.saleAttrValueName.trim()) {
    ElMessage.error("属性值不能为空");
    row.flag = false;
    return;
  } else if (isRepeat) {
    ElMessage.error("属性值重复了");
    return;
  }
  row.spuSaleAttrValueList.push(tagObj);
  row.flag = false;
  row.input = "";
};
// 删除销售属性
let deleteAttrValue = (index: number) => {
  saleAttrList.value.splice(index, 1);
};
// 取消按钮
const cancle = () => {
  $emit("changeScreen", 0);
};
// 获取数据
async function initHasSpuData(data: SpuRecords) {
  let { id } = data;
  spuParams.value = data;
  getTrademarkList();
  getImageList(id as number);
  getSaleAttrList(id as number);
  getBaseAttrList();
}
// 初始化表单
let initAddSpuForm = (id: number) => {
  // 初始化
  Object.assign(spuParams.value, {
    category3Id: 0, //三级分类ID
    id: null, //SPU ID
    description: "", // SPU描述
    spuName: "", // SPU名称
    tmId: null, // 品牌ID
    spuImageList: null,
    spuSaleAttrList: null,
  });
  imageList.value = [];
  saleAttrList.value = [];
  selectSaleAttr.value = "";
  // 获取三级分类ID
  spuParams.value.category3Id = id;
  getTrademarkList();
  getBaseAttrList();
};
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
  }
}
// 获取商品基础属性
async function getBaseAttrList() {
  let res: SpuBaseAttrResponseData = await reqGetBaseAttrList();
  if (res.code == 200) {
    baseAttrList.value = res.data;
  }
}
// 未添加的基础属性
let unSelectedAttr = computed(() => {
  let unSelectedArr = baseAttrList.value.filter((itemAll) => {
    return !saleAttrList.value.some(
      (item) => itemAll.name == item.saleAttrName
    );
  });
  return unSelectedArr;
});
// 保存
let saveInfo = async () => {
  spuParams.value.spuImageList = imageList.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url,
    };
  });
  spuParams.value.spuSaleAttrList = saleAttrList.value;
  let res = await reqAddOrUpdateSpu(spuParams.value);
  let flag = spuParams.value.id ? "修改" : "新增";
  if (res.code == 200) {
    ElMessage.success(`${flag}成功`);
    // 回到主页面
    $emit("changeScreen", 0, flag);
  } else {
    ElMessage.success(`${flag}失败`);
  }
};
// 对外暴露
defineExpose({ initHasSpuData, initAddSpuForm });
</script>

<style scoped></style>

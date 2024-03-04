<template>
  <el-dialog
    :close-on-click-modal="false"
    :model-value="dialogFormVisible"
    :title="title"
    @close="closeDialog"
  >
    <el-form
      ref="formRef"
      :model="trademarkParams"
      :rules="rules"
      style="width: 80%"
    >
      <el-form-item label="品牌名称" label-width="140" prop="tmName">
        <el-input
          v-model="trademarkParams.tmName"
          autocomplete="off"
          placeholder="请输入品牌名称"
        />
      </el-form-item>
      <el-form-item label="品牌LOGO" label-width="140" prop="logoUrl">
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="trademarkParams.logoUrl"
            :src="trademarkParams.logoUrl"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="$emit('closeDialog', false)">取消</el-button>
        <el-button type="primary" @click="confirm">确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, defineProps, defineEmits, watch } from "vue";
import type { TradeMark } from "@/api/product/trademark/type";
import { reqAddOrUpdateTradeMark } from "@/api/product/trademark";
import type { UploadProps, FormRules } from "element-plus";
import { ElMessage } from "element-plus";

let props = defineProps({
  dialogFormVisible: {
    type: Boolean,
    required: true,
  },
  trademarkEdit: {
    type: Object,
    default: {},
  },
  title: {
    type: String,
  },
});
const $emit = defineEmits(["closeDialog", "getAfterUpdate"]);
let formRef = ref();

watch(
  () => props.trademarkEdit,
  (val) => {
    Object.assign(trademarkParams, val);
  },
  { deep: true }
);

// 表单收集
let trademarkParams = reactive<TradeMark>({
  tmName: "",
  logoUrl: "",
});
// 品牌名称校验
const validateTmName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2 && value.trim().length <= 10) {
    callback();
  } else {
    callback(new Error("长度范围为2-10"));
  }
};
// 品牌Logo校验
const validateLogo = (rule: any, value: any, callback: any) => {
  if (value) {
    callback();
  } else {
    callback(new Error("图片未上传"));
  }
};
// 表单校验规则
let rules = reactive<FormRules>({
  tmName: [
    {
      required: true,
      validator: validateTmName,
      trigger: "blur",
    },
  ],
  logoUrl: [
    {
      required: true,
      validator: validateLogo,
    },
  ],
});

// 上传成功的回调
const handleAvatarSuccess: UploadProps["onSuccess"] = (response) => {
  trademarkParams.logoUrl = response.data;
  formRef.value.clearValidate("logoUrl");
};

// 约束文件类型
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  let typeArr = ["image/png", "image/jpg", "image/gif"];
  if (typeArr.indexOf(rawFile.type) == -1) {
    ElMessage.error("上传格式务必未jpg||png||gif");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 4) {
    ElMessage.error("文件大小不能大于4MB!");
    return false;
  }
  return true;
};

// 点击确认的回调
async function confirm() {
  // 表单校验  成功才执行后续
  await formRef.value.validate();
  let res = await reqAddOrUpdateTradeMark(trademarkParams);
  let message = trademarkParams.id ? "修改" : "新增";
  if (res.code == 200) {
    ElMessage.success(`${message}成功`);
    // 关闭对话框
    $emit("closeDialog", false);
    // 重新获取表格数据
    $emit("getAfterUpdate", message);
  } else {
    ElMessage.error(`${message}失败`);
  }
}
// 关闭对话框
function closeDialog() {
  // 清除trademarkParams数据
  formRef.value.resetFields();
  $emit("closeDialog");
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>

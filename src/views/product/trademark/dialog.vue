<template>
  <el-dialog
    :close-on-click-modal="false"
    :model-value="dialogFormVisible"
    :title="title"
    @close="$emit('update:dialogFormVisible', false)"
  >
    <el-form :model="form" style="width: 80%">
      <el-form-item label="品牌名称" label-width="140">
        <el-input
          v-model="form.name"
          autocomplete="off"
          placeholder="请输入品牌名称"
        />
      </el-form-item>
      <el-form-item label="品牌LOGO" label-width="140">
        <el-upload
          v-model:file-list="fileList"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="$emit('update:dialogFormVisible', false)"
          >取消</el-button
        >
        <el-button type="primary" @click="confirm">确认 </el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, defineProps } from "vue";
import type { UploadProps, UploadUserFile } from "element-plus";

defineProps({
  dialogFormVisible: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
  },
});
const form = ref({
  name: "",
  logoUrl: "",
});
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

function confirm() {}
</script>

<style scoped></style>

<template>
  <el-dialog v-model="dialogVisible" :title="props.title" width="30%" :before-close="handleClose">
    <slot />
    <template #footer>
      <!-- <slot name="footerContent" /> -->
      <span class="dialog-footer">
        <el-button @click="clickDialogClose">取消</el-button>
        <el-button type="primary" @click="clickDialogConfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang='ts'>
import { ref, type Ref } from 'vue'
import { ElMessageBox } from 'element-plus'

const props = defineProps({
  title: {
    type: String,
    default: '标题'
  }
})
const emits = defineEmits(['dialogConfirm', 'dialogClose'])



const dialogVisible: Ref<boolean> = ref(false)
const showDoalog = () => {
  dialogVisible.value = true
}
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('当前学生未保存,你确定要取消吗?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}

const clickDialogConfirm = () => {
  dialogVisible.value = false
  emits('dialogConfirm')
}
const clickDialogClose = () => {
  dialogVisible.value = false
  emits('dialogClose')
}
defineExpose({
  dialogVisible,
  showDoalog
})
</script>
<style scoped>
</style>
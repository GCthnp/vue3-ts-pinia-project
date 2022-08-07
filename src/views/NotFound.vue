<template>
  <div class="not-find">
    <el-empty description="404" />
    <div style="margin: 20px 0; display: flex;justify-content: center;">
      <el-button type="primary" @click="goBack">返回</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router"
const router = useRouter()
const goBack = () => {
  router.replace("/")
}
</script>

<style lang="less" scoped>
.not-find {
  width: 100%;
  height: 100%;
}
</style>

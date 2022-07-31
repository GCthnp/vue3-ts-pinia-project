<template>
  <div class="nav-header">
    <el-icon :size="30" @click="">
      <Fold></Fold>
    </el-icon>
    <div class="bread-crumb">bread-crumb</div>
    <div class="user-info">userInfo</div>
  </div>
</template>
<script setup lang='ts'>
import { Fold } from '@element-plus/icons-vue'
</script>
<style scoped lang="less">
.nav-header {
  display: flex;
  height: 100%;
  align-items: center;

  .bread-crumb {
    flex: 1;
    margin-left: 20px;
  }
}
</style>
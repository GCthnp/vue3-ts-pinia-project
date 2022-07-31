<template>
  <div class="common-layout">
    <el-container class="common-container">
      <!-- <el-aside class="aside-left"> -->
      <NavMenu></NavMenu>
      <!-- </el-aside> -->
      <el-container>
        <el-header style="height: 50px;">
          <NavHeader></NavHeader>
        </el-header>
        <el-main class="main">
          <keep-alive>
            <router-view />
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import NavMenu from "@/components/nav-menu/NavMenu.vue"
import NavHeader from "@/components/nav-header/NavHeader.vue"
</script>

<style scoped lang="less">
.common-layout {
  height: 100%;


  .common-container {
    height: 100%;
  }

  .main {
    background-color: #f0f2f5;
  }

  .aside-left {
    background-color: rgb(12, 33, 53);
  }
}
</style>

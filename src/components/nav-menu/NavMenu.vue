<template>
  <div class="navMenu">
    <div class="logo">
      <img src="~@/assets/logo.svg" alt="" />
      <span v-show="!isCollapse" class="title">Vue3+TS</span>
    </div>
    <el-menu :collapse="isCollapse" router :default-active="currentRoute" class="el-menu-vertical-demo"
      background-color="#545c64" text-color="#fff" @select="handleSelect">
      <template v-for="item in navMenu">
        <el-menu-item v-if="!item.children" @click="clickMenuItem" :index="item.path" :key="item.path">
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
          <!-- <span>{{ item.name }}</span> -->
          <template #title>{{ item.name }}</template>
        </el-menu-item>
        <el-sub-menu v-else>
          <template #title>
            <el-icon>
              <component :is="item.icon" />
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="cItem in item.children" :index="cItem.path" :key="cItem.path">
              <!-- <span>{{ cItem.name }}</span> -->
              <template #title>{{ cItem.name }}</template>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>
<script setup lang='ts'>
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router'
import navMenu from "@/util/navMenu"
const route = useRoute()

let currentRoute = ref(route.path)
let isCollapse = ref(false)

// onMounted(() => {
//   currentRoute = route.path
//   console.log(currentRoute);

// })

const handleSelect = (key: string) => {
  // currentRoute = key
  console.log(currentRoute, "=-----------");

}

const clickMenuItem = (currentInstance) => {
  console.log(currentInstance);

  // currentRoute = currentInstance.index
}





</script>
<style scoped lang="less">
.navMenu {
  height: 100%;
  background-color: rgb(12, 33, 53);

  .el-menu-vertical-demo {
    border-right: 0;

    &:not(.el-menu--collapse) {
      width: 200px;
    }
  }

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    img {
      height: 80%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }


}
</style>
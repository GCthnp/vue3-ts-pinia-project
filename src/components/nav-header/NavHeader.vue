<template>
  <div class="nav-header">
    <el-icon :size="30" @click="showNavMenu" :class="openMenu ? 'open-menu' : 'close-menu'">
      <Fold></Fold>
    </el-icon>
    <div class="bread-crumb">{{ bread }}</div>

    <div class="user-info">
      <div class="weather-info">
        {{ weatherInfo.lives.city }}
        <i v-if="weather.includes('晴')" class="qi-sunny-fill" style="font-size: 30px;color: yellow;"></i>
        <i v-else-if="weather.includes('阴')" class="qi-overcast-fill" style="font-size: 30px;color: #4e4e4e;"></i>
        <i v-else-if="weather.includes('云')" class="qi-cloudy-fill" style="font-size: 30px;color: #4e4e4e;"></i>
        <i v-else-if="weather.includes('雨')" class="qi-drizzle-rain-fill" style="font-size: 30px;color: #4e4e4e;"></i>
        <i v-else-if="weather.includes('雪')" class="qi-snow-fill" style="font-size: 30px;color: #4e4e4e;"></i>
        <!-- <i v-else class="qi-mist" style="font-size: 30px;color: #4e4e4e;"></i> -->
        {{ weatherInfo.lives.weather }}
      </div>
      <el-dropdown>

        <div class="el-dropdown-link">
          <el-avatar :size="30" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png" />
          <span class="user-name">{{ userName }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="el-icon-plus">我的信息</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus" @click="exitLoginClick">退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>


</template>
<script setup lang='ts'>
import { getCurrentInstance, ref, computed, onBeforeMount, reactive, toRef, watchEffect } from "vue";
import type { ComputedRef, Ref } from "vue";
import { useRoute, useRouter } from 'vue-router'
import { Fold } from '@element-plus/icons-vue'
import { reqIp, reqWeather } from "@/serves/api";

const instance = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const userName: string = JSON.parse(localStorage.getItem("testUser") || '').name
const openMenu = ref<boolean>(true)  //控制菜单栏展开收起
let weatherInfo = reactive<any>({
  lives: {}
})
let weather: Ref<string> = ref('')

watchEffect(() => {
  console.log("监听到了变化-------------");
  if (weatherInfo.lives.weather) {
    weather.value = weatherInfo.lives.weather
  }
})

const bread: ComputedRef = computed(() => {
  return route.meta.name
})

const showNavMenu = () => {
  openMenu.value = !openMenu.value
  instance?.proxy?.$Bus.emit('isShowNavMenu')
}
// 退出登录
const exitLoginClick = () => {
  localStorage.removeItem("testToken");
  localStorage.removeItem("testUser");
  router.replace("/login");
}

const getIp = async () => {
  try {
    let res = await reqIp()
    console.log(res);
    if (res.status == "1") {
      getWeather(res.adcode)
    }
  } catch (error) {

  }
}
const getWeather = async (city: string) => {
  try {
    const res = await reqWeather({ city, key: '55914c864c118ff8634f2789926785f3' })
    if (res.status == "1") {
      weatherInfo.lives = res.lives[0]
    }

  } catch (error) {
    instance?.proxy?.$message.error("获取天气错误！")
  }
}
onBeforeMount(() => {
  getIp()
})
</script>
<style scoped lang="less">
.nav-header {
  display: flex;
  height: 100%;
  align-items: center;

  .open-menu {
    transition: 0.2s;
  }

  .close-menu {
    transition: 0.2s;
    transform: rotate(180deg);
  }

  .bread-crumb {
    flex: 1;
    margin-left: 20px;
  }

  .user-info {
    display: flex;
    align-items: center;

    .weather-info {
      display: flex;
      width: 120px;
      justify-content: space-around;
      align-items: center;
      margin-right: 20px;
    }

    .el-dropdown-link {
      display: flex;
      align-items: center;
      width: 100px;
      justify-content: space-around;
    }
  }
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>
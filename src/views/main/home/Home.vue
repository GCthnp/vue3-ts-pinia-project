<template>
  <el-card class="box-card">
    <div class="left-box">
      <ChinaCovidAdd ref="chinaCovidAddRef"></ChinaCovidAdd>
      <PieCharts ref="pieChartsRef"></PieCharts>
      <LineCharts ref="LineChartsRef"></LineCharts>
    </div>
    <div class="center-box">
      <ChinaMap ref="chinaMapRef"></ChinaMap>
    </div>
    <div class="right-box">
      <CityCovidTable></CityCovidTable>
    </div>
  </el-card>
</template>
<script setup lang='ts'>
import { ref, onMounted, getCurrentInstance } from "vue"
import { useCovidInfoStore } from "@/stores/userInfo"

import ChinaMap from "./childrens/ChinaMap.vue";
import CityCovidTable from "./childrens/CityCovidTable.vue";
import ChinaCovidAdd from "./childrens/ChinaCovidAdd.vue";
import PieCharts from "./childrens/PieCharts.vue";
import LineCharts from "./childrens/LineCharts.vue";

const covidInfoStore = useCovidInfoStore()
const instance = getCurrentInstance()

const chinaMapRef = ref<InstanceType<typeof ChinaMap>>()
const pieChartsRef = ref<InstanceType<typeof PieCharts>>()

const LineChartsRef = ref<InstanceType<typeof LineCharts>>()
const province = ref<string>('')

instance?.proxy?.$Bus.on('showAreaCovid', (city: any) => {
  province.value = city
})

onMounted(async () => {

  if (!covidInfoStore.list || !covidInfoStore.list.diseaseh5Shelf) {
    await covidInfoStore.getCovidList()
    covidInfoStore.setCityItem(province.value)
  }
  chinaMapRef.value?.initCharts()
  pieChartsRef.value?.initPie()
  LineChartsRef.value?.initLine()
})
</script>
<style scoped lang="less">
.box-card {
  height: 100%;
  // background-color: red;
  background: url("@/assets/covidBg.jpg");
  background-size: 100% 100%;

  :deep(.el-card__body) {
    display: flex;
    padding: 10px;
    box-sizing: border-box;
    height: 100%;
    opacity: 0.8;

    .left-box {
      // width: 340px;
      width: 24%;
      display: flex;
      flex-direction: column;
    }

    .right-box {
      width: 300px;
      width: 23%;
    }

    .center-box {
      flex: 1;
    }
  }

}
</style>
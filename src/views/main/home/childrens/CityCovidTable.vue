<template>
  <el-scrollbar>
    <el-table size="small" :header-cell-style="cityCovidHeaderRow" max-height="calc(90vh - 30px)"
      :row-style="cityCovidRow" :data="covidInfoStore.item" style="width: 100%">
      <el-table-column prop="name" label="地区" width="64" />
      <el-table-column prop="today.confirm" label="新增确诊" min-width="58" />
      <el-table-column prop="total.confirm" label="累计确诊" min-width="64" />
      <el-table-column prop="total.heal" label="治愈" min-width="58" />
      <el-table-column prop="total.dead" label="死亡" min-width="56" />
    </el-table>
  </el-scrollbar>
</template>
<script setup lang='ts'>
import { useCovidInfoStore } from "@/stores/userInfo"
const covidInfoStore = useCovidInfoStore()

const cityCovidRow = () => {
  return {
    backgroundColor: '#3f6598',
    color: '#41b0db',
  }
}
const cityCovidHeaderRow = () => {
  return {

    backgroundColor: '#223651',
    color: '#fff',
    height: '50px'
  }
}
</script>
<style scoped>
</style>
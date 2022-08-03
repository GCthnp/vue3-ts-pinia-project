<template>
  <div id="covid-line"></div>
</template>
<script setup lang='ts'>
import * as echarts from "echarts"
import { useCovidInfoStore } from "@/stores/userInfo"
const covidInfoStore = useCovidInfoStore()

const initLine = () => {
  const charts = echarts.init(document.querySelector('#covid-line') as HTMLElement)
  charts.setOption({
    backgroundColor: "#223651",
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: covidInfoStore.cityDetail.map(v => v.city),
      axisLine: {
        lineStyle: {
          color: "#fff"
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: "#fff"
        }
      }
    },
    label: {
      show: true
    },
    series: [
      {
        data: covidInfoStore.cityDetail.map(v => v.nowConfirm),
        type: 'line',
        smooth: true
      }
    ]
  })
}
defineExpose({
  initLine
})
</script>
<style scoped lang="less">
#covid-line {
  width: 100%;
  // height: 224px;
  flex: 1;
  margin-top: 10px;
}
</style>
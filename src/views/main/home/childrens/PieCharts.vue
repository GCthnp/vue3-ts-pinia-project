<template>
  <div id="covid-pie"></div>
</template>
<script setup lang='ts'>
import * as echarts from "echarts"
import { useCovidInfoStore } from "@/stores/userInfo"
const covidInfoStore = useCovidInfoStore()

const initPie = () => {
  const charts = echarts.init(document.querySelector('#covid-pie') as HTMLElement)
  charts.setOption({
    backgroundColor: "#223651",
    title: {
      text: "现有确诊病例排行前十",
      left: 'center',
      top: '10',
      textStyle: {
        fontSize: 18,
        color: "#fff"
      },
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        type: 'pie',
        radius: ['20%', '50%'],
        center: ['50%', '60%'],
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 1,
          textShadowBlur: 10,
          textShadowColor: "#33ffff",
        },
        label: {
          show: true,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '15',
          }
        },
        data: covidInfoStore.cityDetail.map(v => {
          return {
            name: v.city,
            value: v.nowConfirm
          }
        })
      }
    ]
  })
}
defineExpose({
  initPie
})
</script>
<style scoped>
#covid-pie {
  width: 100%;
  /* height: 224px; */
  flex: 1;
  margin-top: 10px;
}
</style>
<template>
  <div id="china"></div>
</template>
<script setup lang='ts'>
import { onMounted } from "vue"
import * as echarts from "echarts"
import { useCovidInfoStore } from "@/stores/userInfo"
import { geoCoordMap } from '@/assets/geoMap'
import "@/assets/china"

const covidInfoStore = useCovidInfoStore()

const initCharts = () => {
  const city = covidInfoStore.list.diseaseh5Shelf.areaTree[0].children;
  const data: Array<CityItem> = city.map(v => {
    return {
      name: v.name,
      value: geoCoordMap[v.name].concat(v.total.nowConfirm),
      children: v.children
    }
  })
  console.log(covidInfoStore.chinaAdd);

  const charts = echarts.init(document.querySelector('#china') as HTMLElement)
  charts.setOption({
    geo: {
      map: "china",
      aspectScale: 0.8,
      layoutCenter: ["50%", "50%"],
      layoutSize: "110%",
      itemStyle: {
        areaColor: "#0f5d9d",
        shadowColor: "rgb(6, 115, 173,0.5)",
        shadowOffsetX: 0,
        shadowOffsetY: 8,
        shadowBlur: 10,
      },
      emphasis: {
        areaColor: "#0f5d9d",
        focus: 'self'
      },
      label: {
        show: 'false',

      },
      select: {

        itemStyle: {
          areaColor: 'red',
          color: 'red'
        }
      },
      regions: [
        {
          name: "南海诸岛",
          itemStyle: {
            areaColor: "rgba(6, 115, 173, 1)",
            borderColor: "#6cdbff",
            //normal: {
            opacity: 0,
            shadowOffsetY: 0,
            label: {
              show: false,
              color: "#009cc9",
            },
            //},
          },
          label: {
            show: false,
            color: "#FFFFFF",
            fontSize: 12,
          },
        },
      ],
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params: any) {
        let { name, value } = params.data
        return `<div>${name}:${value[2]}</div>`
      },
    },
    series: [
      {
        type: "map",
        map: "china",
        aspectScale: 0.8,
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: "110%",
        label: {
          show: true,
          color: "#FFFFFF",
          fontSize: 12,
        },
        itemStyle: {
          areaColor: "#0c3653",
          borderColor: "#1cccff",
          borderWidth: 1.8,
        },
        emphasis: {
          areaColor: "#56b1da",
          label: {
            show: true,
            color: "#fff",
          },
        },
        data: data,
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        symbol: 'pin',
        symbolSize: [45, 45],
        label: {
          show: true,
          color: "#fff",
          formatter(value: any) {
            return value.data.value[2]
          }
        },
        itemStyle: {
          color: '#1E90FF', //标志颜色
        },
        data: data,
      },
    ],
  })
  charts.on("click", (e) => {
    console.log(e);
    covidInfoStore.item = e.data.children
  })
}

defineExpose({
  initCharts
})

interface CityItem {
  name: string,
  value: Array<any>
  children: Array<any>
}
</script>
<style scoped>
#china {
  flex: 1;
  height: 100%;
}
</style>
import { defineStore } from 'pinia'
import { getList } from '../serves/api'
import type {
  RootObject,
  Children,
  ChinaTotal,
  ChinaAdd,
  StatisGradeCityDetail,
  AreaTree,
} from './type'

export const useCovidInfoStore = defineStore({
  id: 'covidInfo',
  state: () => ({
    list: <RootObject>{},
    item: <Children[]>[],
    chinaAdd: <ChinaAdd>{},
    chinaTotal: <ChinaTotal>{},
    cityDetail: <StatisGradeCityDetail[]>[],
    allAreaTree: <AreaTree[]>[],
    city: <string>'',
  }),
  getters: {},
  actions: {
    // 获取新冠疫情信息
    async getCovidList() {
      let res = await getList()
      this.list = res.data

      this.item = this.list.diseaseh5Shelf.areaTree[0].children[1].children
      this.chinaAdd = this.list.diseaseh5Shelf.chinaAdd
      this.chinaTotal = this.list.diseaseh5Shelf.chinaTotal
      let allCityDetail = this.list.statisGradeCityDetail
      this.cityDetail = allCityDetail
        .sort((a, b) => b.nowConfirm - a.nowConfirm)
        .splice(0, 10)
      this.allAreaTree = this.list.diseaseh5Shelf.areaTree[0].children
    },
    setCityItem(city: string) {
      let nowCity = city ?? this.city
      let cityItem = this.allAreaTree.find((item) =>
        nowCity.includes(item.name)
      )
      if (cityItem) {
        this.item = cityItem?.children
      }
    },
  },
})

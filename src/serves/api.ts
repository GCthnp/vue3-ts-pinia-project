import * as API from './index'
import type { userFormType } from '../views/login/childrens/LoginType'

const getList = () => {
  return API.GET('/api/list')
}
const login = (params: userFormType) => API.POST('/api/login', params)

// 高德地图天气查询
const reqWeather = (parameters: any) =>
  API.GET('https://restapi.amap.com/v3/weather/weatherInfo', parameters)
// 高德 获取定位ip信息  key为高德key
const reqIp = () =>
  API.GET('http://restapi.amap.com/v3/ip?key=55914c864c118ff8634f2789926785f3')

const getStudentList = () => {
  return API.GET('/api/students')
}

export { login, getList, reqWeather, reqIp, getStudentList }

import * as API from './index'
import type { userFormType } from '../views/login/childrens/LoginType'

const getList = () => {
  return API.GET('/api/list')
}
const login = (params: userFormType) => {
  return API.POST('/api/login', params)
}

export { login, getList }

import axios from 'axios'

const serve = axios.create({
  baseURL: 'http://localhost:3333',
})

export const GET = (url: string, params?: any) => {
  return serve
    .get(`${url}`, {
      params: params,
    })
    .then((res) => res.data)
}

export const POST = (url: string, params?: any) => {
  return serve.post(`${url}`, params).then((res) => res.data)
}

// console.log(GET('/api/list'))

// export const POST = () => {}
// export const getHomeList = () => serve.get('/api/list').then((res) => res.data)

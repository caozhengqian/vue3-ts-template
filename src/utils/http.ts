import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import {useUserStore} from '@/stores/user'

const instance = axios.create({
  // baseURL: 'http://api.h5ke.top/',
  baseURL: '/',
  timeout: 5000
})

instance.interceptors.request.use(

  function (config) {
      const userStore = useUserStore()
      const token = userStore.token
      if(config.headers){
          config.headers.authorization = token
      }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (response) {
      if(response.data.errmsg === 'token error'){
          const userStore = useUserStore()
          userStore.clearToken()
          setTimeout(()=>{
              window.location.replace('/login')
          },1000)
      }
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

interface Data {
  [index: string]: unknown
}

interface Http {
  get: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
  post: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
  put: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
  patch: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
  delete: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
}

const http: Http = {
  get(url, data, config) {
    return instance.get(url, {
      params: data,
      ...config
    })
  },
  post(url, data, config) {
    return instance.post(url, data, config)
  },
  put(url, data, config) {
    return instance.put(url, data, config)
  },
  patch(url, data, config) {
    return instance.patch(url, data, config)
  },
  delete(url, data, config) {
    return instance.delete(url, {
      data,
      ...config
    })
  }
}
export default http

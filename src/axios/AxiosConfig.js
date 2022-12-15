import Axios from 'axios'
import Vue from 'vue'
import { Notify } from 'quasar'
import qs from 'qs'

/**
 * axios 初始化
 */
 // Vue.prototype.$baseURL = process.env.NODE_ENV === 'production' ? '/api/' : 'http://1880orso.xb35/api/'
Vue.prototype.$baseURL = process.env.NODE_ENV === 'production' ? '/api/' : 'http://kick.yoozhi.cn/api/'
Vue.prototype.$rootURL = process.env.NODE_ENV === 'production' ? '/' : 'http://kick.yoozhi.cn/'

const axios = Axios.create({
  baseURL: Vue.prototype.$baseURL, // 请求基地址
  timeout: Vue.prototype.$timeOut // 超时时间
})

// 请求拦截器
axios.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('access_token')
    config.headers.Authorization = 'Bearer ' + token
    // config.headers['SC'] = 12
    if (config.type) {
      switch (config.type) {
        case 'FORM-DATA':
          config.transformRequest = [data => { return 'args=' + JSON.stringify(data) }]
          break
        case 'FORM':
          config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
          config.data = qs.stringify(config.data)
          break
        default:
          break
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
const defaultNotify = {
      message: '未知错误',
      icon: 'warning',
      color: 'warning',
      position: 'top',
      timeout: 1500
}
// 响应拦截器
axios.interceptors.response.use(
  response => {
    if(response.data.code == 200){
      return response 
    }else{
      defaultNotify.message = response.data.message
      Notify.create(defaultNotify)
      return response 
    }
  },
  error => {
    if (error.code === 'ECONNABORTED' || error.message.indexOf('timeout') !== -1 || error.message === 'Network Error') {
      defaultNotify.message = '网络异常'
      return Promise.reject(error)
    }
    switch (error.response.status) {
      case 401:
        defaultNotify.message = '鉴权失败(401)'
        Notify.create(defaultNotify)
        break
      case 403:
        defaultNotify.message = '拒绝访问(403)'
        Notify.create(defaultNotify)
        break
      case 404:
        defaultNotify.message = '资源不存在(404)'
        Notify.create(defaultNotify)
        break
      case 408:
        defaultNotify.message = '请求超时(408)'
        Notify.create(defaultNotify)
        break
      case 500:
        defaultNotify.message = '服务器错误(500)'
        Notify.create(defaultNotify)
        break
      case 501:
        defaultNotify.message = '服务未实现(501)'
        Notify.create(defaultNotify)
        break
      case 502:
        defaultNotify.message = '网络错误(502)'
        Notify.create(defaultNotify)
        break
      case 503:
        defaultNotify.message = '服务不可用(503)'
        Notify.create(defaultNotify)
        break
      case 504:
        defaultNotify.message = '网络超时(504)'
        Notify.create(defaultNotify)
        break
      case 505:
        defaultNotify.message = 'HTTP版本不受支持(505)'
        Notify.create(defaultNotify)
        break
      default:
        break
    }
    return Promise.reject(error)
  }
)

export default axios

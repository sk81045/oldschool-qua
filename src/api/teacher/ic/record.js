import _axios from '@/axios/AxiosConfig'
import Vue from 'vue'
const Prefix = 'mobile/teacher/sellfood/'

export function record (params) {
  return _axios({
    url: Prefix+'record',
    method: 'get',
    responseType: 'text',
    params
  })
}





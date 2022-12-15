import _axios from '@/axios/AxiosConfig'
import Vue from 'vue'
const Prefix = 'mobile/student/circle'

export function getList (params) {
  return _axios({
    url: Prefix+'/list',
    method: 'get',
    responseType: 'text',
    params
  })
}

export function Like (data) {
  return _axios({
    url: 'mobile/affairs/circle/like',
    method: 'post',
    responseType: 'text',
    data
  })
}

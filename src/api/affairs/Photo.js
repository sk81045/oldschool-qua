import _axios from '@/axios/AxiosConfig'
import Vue from 'vue'
const Prefix = 'mobile/affairs'

export function photoAdd (data) {
  return _axios({
    url: Prefix+'/personinfo/photo/add',
    method: 'post',
    responseType: 'text',
    data
  })
}

export function photo (params) {
  return _axios({
    url: Prefix+'/personinfo/photo',
    method: 'get',
    responseType: 'text',
    params
  })
}






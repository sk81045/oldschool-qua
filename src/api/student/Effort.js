import _axios from '@/axios/AxiosConfig'
import Vue from 'vue'
const Prefix = 'mobile/student/exam'

export function List (params) {
  return _axios({
    url: Prefix+'/list',
    method: 'get',
    responseType: 'text',
    params
  })
}




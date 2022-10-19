import _axios from '@/axios/AxiosConfig'
import Vue from 'vue'
const Prefix = 'mobile/teacher/apply'

export function getProject (params) {
  return _axios({
    url: Prefix+'/project',
    method: 'get',
    responseType: 'text',
    params
  })
}
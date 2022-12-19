import _axios from '@/axios/AxiosConfig'
import Vue from 'vue'
const Prefix = 'mobile/teacher/coursework'

export function List (params) {
  return _axios({
    url: Prefix+'/list',
    method: 'get',
    responseType: 'text',
    params
  })
}
export function Worklist (params) {
  return _axios({
    url: Prefix+'/worklist',
    method: 'get',
    responseType: 'text',
    params
  })
}
export function Add (data) {
  return _axios({
    url: Prefix+'/add',
    method: 'post',
    responseType: 'text',
    data
  })
}

export function Upload (data) {
  return _axios({
    url: Prefix+'/uploader',
    method: 'post',
    responseType: 'text',
    data
  })
}



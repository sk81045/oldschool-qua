import _axios from '@/axios/AxiosConfig'
import Vue from 'vue'
const Prefix = 'mobile/teacher/effort'

export function getProject (params) {
  return _axios({
    url: Prefix+'/project',
    method: 'get',
    responseType: 'text',
    params
  })
}

export function List (params) {
  return _axios({
    url: Prefix+'/list',
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
import _axios from '@/axios/AxiosConfig'
import Vue from 'vue'
const Prefix = 'mobile/affairs'

export function getList (params) {
  return _axios({
    url: Prefix+'/circle/list',
    method: 'get',
    responseType: 'text',
    params
  })
}

export function Add (data) {
  return _axios({
    url: Prefix+'/circle/add',
    method: 'post',
    responseType: 'text',
    data
  })
}

export function Like (data) {
  return _axios({
    url: Prefix+'/circle/like',
    method: 'post',
    responseType: 'text',
    data
  })
}

export function Delete (data) {
  return _axios({
    url: Prefix+'/circle/delete',
    method: 'post',
    responseType: 'text',
    data
  })
}

export function Upload (data) {
  return _axios({
    url: Prefix+'/circle/img/uploader',
    method: 'post',
    responseType: 'text',
    data
  })
}




import _axios from '@/axios/AxiosConfig'
import Vue from 'vue'
const Prefix = 'mobile/student/manager'

export function getList (params) {
  return _axios({
    url: Prefix+'/list',
    method: 'get',
    responseType: 'text',
    params
  })
}

export function Infomation (params) {
  return _axios({
    url: Prefix+'/infomation',
    method: 'get',
    responseType: 'text',
    params
  })
}

export function getGrade (params) {
  return _axios({
    url: Prefix+'/grade',
    method: 'get',
    responseType: 'text',
    params
  })
}
export function getClass (params) {
  return _axios({
    url: Prefix+'/class',
    method: 'get',
    responseType: 'text',
    params
  })
}
export function saveData (data) {
  return _axios({
    url: Prefix+'/add',
    method: 'post',
    responseType: 'text',
    data
  })
}
export function savePhoto (data) {
  return _axios({
    url: Prefix+'/photo/add',
    method: 'post',
    responseType: 'text',
    data
  })
}

export function Update (data) {
  return _axios({
    url: Prefix+'/update',
    method: 'post',
    responseType: 'text',
    data
  })
}

export function Delete (data) {
  return _axios({
    url: Prefix+'/delete',
    method: 'post',
    responseType: 'text',
    data
  })
}

export function Evaluation (data) {
  return _axios({
    url: Prefix+'/evaluation/add',
    method: 'post',
    responseType: 'text',
    data
  })
}
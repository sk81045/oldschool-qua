import _axios from '@/axios/AxiosConfig'
import Vue from 'vue'
const Prefix = 'mobile/student'

export function getList (params) {
  return _axios({
    url: Prefix+'/vacation/list',
    method: 'get',
    responseType: 'text',
    params
  })
}

export function getApprover (params) {
  return _axios({
    url: Prefix+'/vacation/approver',
    method: 'get',
    responseType: 'text',
    params
  })
}

export function saveData (data) {
  return _axios({
    url: Prefix+'/vacation/add',
    method: 'post',
    responseType: 'text',
    data
  })
}

export function Delete (data) {
  return _axios({
    url: Prefix+'/vacation/delete',
    method: 'post',
    responseType: 'text',
    data
  })
}

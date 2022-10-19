import _axios from '../axios/AxiosConfig'
import Vue from 'vue'

export function getList (params) {
  return _axios({
    url: 'mobile/vacation/list',
    method: 'get',
    responseType: 'text',
    params
  })
}

export function getApprover (params) {
  return _axios({
    url: 'mobile/vacation/approver',
    method: 'get',
    responseType: 'text',
    params
  })
}

export function saveData (data) {
  return _axios({
    url: 'mobile/vacation/add',
    method: 'post',
    responseType: 'text',
    data
  })
}

export function Delete (data) {
  return _axios({
    url: 'vacation/delete',
    method: 'post',
    responseType: 'text',
    data
  })
}

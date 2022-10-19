import _axios from '../axios/AxiosConfig'
import Vue from 'vue'

export function getList (params) {
  return _axios({
    url: 'department/list',
    method: 'get',
    responseType: 'text',
    params
  })
}

export function getMember (params) {
  return _axios({
    url: 'department/member',
    method: 'get',
    responseType: 'text',
    params
  })
}
export function removeMembers (data) {
  return _axios({
    url: 'department/remove',
    method: 'post',
    responseType: 'text',
    data
  })
}

export function addMembers (data) {
  return _axios({
    url: 'department/addMember',
    method: 'post',
    responseType: 'text',
    data
  })
}

export function saveData (data) {
  return _axios({
    url: 'department/add',
    method: 'post',
    responseType: 'text',
    data
  })
}

export function renewData (data) {
  return _axios({
    url: 'department/renew',
    method: 'post',
    responseType: 'text',
    data
  })
}

export function deleteData (data) {
  return _axios({
    url: 'department/delete',
    method: 'post',
    responseType: 'text',
    data
  })
}
import _axios from '../axios/AxiosConfig'
import Vue from 'vue'

export function getList (params) {
  return _axios({
    url: 'mobile/student/list',
    method: 'get',
    responseType: 'text',
    params
  })
}

export function Infomation (params) {
  return _axios({
    url: 'mobile/student/infomation',
    method: 'get',
    responseType: 'text',
    params
  })
}
export function getDepartment (params) {
  return _axios({
    url: 'teacher/departmentlist',
    method: 'get',
    responseType: 'text',
    params
  })
}

export function saveData (data) {
  return _axios({
    url: 'mobile/student/add',
    method: 'post',
    responseType: 'text',
    data
  })
}
export function savePhoto (data) {
  return _axios({
    url: 'mobile/photo/add',
    method: 'post',
    responseType: 'text',
    data
  })
}

export function Update (data) {
  return _axios({
    url: 'teacher/update',
    method: 'post',
    responseType: 'text',
    data
  })
}

export function Delete (data) {
  return _axios({
    url: 'teacher/delete',
    method: 'post',
    responseType: 'text',
    data
  })
}

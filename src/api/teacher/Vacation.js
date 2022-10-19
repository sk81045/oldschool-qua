import _axios from '@/axios/AxiosConfig'
import Vue from 'vue'
const Prefix = 'mobile/teacher'

export function getList (params) {
  return _axios({
    url: Prefix+'/vacation/list',
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
    url: 'teacher/add',
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

export function getApprover (params) {
  return _axios({
    url: Prefix+'/vacation/approver',
    method: 'get',
    responseType: 'text',
    params
  })
}

export function VacationAdd (data) {
  return _axios({
    url: Prefix+'/vacation/add',
    method: 'post',
    responseType: 'text',
    data
  })
}

export function StudentApproveList (params) {
  return _axios({
    url: Prefix+'/vacation/approver/student/list',
    method: 'get',
    responseType: 'text',
    params
  })
}

export function StudentApproveAction (data) {
  return _axios({
    url: Prefix+'/vacation/approver/student/action',
    method: 'post',
    responseType: 'text',
    data
  })
}
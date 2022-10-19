import _axios from '../axios/AxiosConfig'
import Vue from 'vue'

const methodUrl = 'attendance/'

export function getList (params) {
  return _axios({
    url: methodUrl+'log/list',
    method: 'get',
    responseType: 'text',
    params
  })
}


export function getDepartment (params) {
  return _axios({
    url: methodUrl+'departmentlist',
    method: 'get',
    responseType: 'text',
    params
  })
}




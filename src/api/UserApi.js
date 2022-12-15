import _axios from '../axios/AxiosConfig'
import Vue from 'vue'

export function getUserRouter () {
  return _axios({
    url: 'http://localhost:9528/data/asyncRouterDemo',
    // url: 'user/get/menus',
    method: 'get',
    responseType: 'text'
  })
}

export function getUserRouter2 () {
  return _axios({
    // url: 'http://localhost:9528/data/asyncRouterDemo',
    // url: 'user/get/menus',
    url: 'mobile/menus',
    method: 'post',
    responseType: 'text'
  })
}

export function getSchool (params) {
  return _axios({
    url: 'outside/school',
    method: 'get',
    responseType: 'text',
    params
  })
}

export function Login (data) {
  return _axios({
    url: 'mobile/login',
    method: 'post',
    responseType: 'text',
    data
  })
}

export function Check (data) {
  return _axios({
    url: 'mobile/check',
    method: 'post',
    responseType: 'text',
    data
  })
}

export function Register (data) {
  return _axios({
    url: 'mobile/register',
    method: 'post',
    responseType: 'text',
    data
  })
}


import _axios from '../axios/AxiosConfig'
import Vue from 'vue'

// const BaseURL = 'device/'

export function getDeviceLog (params) {
  return _axios({
    url: 'device/log/get',
    method: 'get',
    responseType: 'text',
    params
  })
}

export function getDeviceSetting () {
  return _axios({
    url: 'http://gs-api.uface.uni-ubi.com/v1/D56618577FB7476EA9972DB4D7BE4415/device/84E0F425CCD007B2/setting?appid=D56618577FB7476EA9972DB4D7BE4415&token=7d665b5cee70e305f8f6c31c050065651c7f007a861f6cf45bd4437b8474f318&deviceKey=84E0F425CCD007B2',
    method: 'get',
    responseType: 'text'
  })
}

export function setDeviceSetting () {
  return _axios({
    // url: 'http://localhost:9528/data/asyncRouterDemo',
    url: 'user/get/menus',
    method: 'post',
    responseType: 'text'
  })
}

export function getDeviceToken (data) {
  return _axios({
    url: 'user/login',
    method: 'post',
    responseType: 'text',
    data
  })
}

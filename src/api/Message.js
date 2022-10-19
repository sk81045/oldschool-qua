import request from '@/axios/AxiosConfig'
import Vue from 'vue'

export function getList (params) {
  return request({
    url: 'mobile/message',
    method: 'get',
    responseType: 'text',
    params
  })
}


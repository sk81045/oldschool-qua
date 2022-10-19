import _axios from '@/axios/AxiosConfig'
import Vue from 'vue'
const Prefix = 'mobile/affairs'

export function getList (params) {
  return _axios({
    url: Prefix+'/approver/vacation/list',
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

export function ApproveAction (data) {
  return _axios({
    url: Prefix+'/approver/vacation/action',
    method: 'post',
    responseType: 'text',
    data
  })
}



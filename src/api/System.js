import _axios from '../axios/AxiosConfig'
import Vue from 'vue'

export function addROUTER (data) {
  return _axios({
    url: 'system/add/router',
    method: 'post',
    responseType: 'text',
    data
  })
}


import axios from 'axios'
import { Toast } from 'vant'
import useCancelRepeatRequest from '../utils/cancelRepeatRequest'

//取消重复请求
const { addPendingRequest, removePendingRequest } = useCancelRepeatRequest()
// axios
export const server = axios.create({
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    timeout: 10 * 1000,
  },
})

server.interceptors.request.use(
  (config) => {
    config.url = '/api' + config.url
    //取消重复请求
    removePendingRequest(config)
    addPendingRequest(config)
    Toast.loading({
      duration: 0,
      forbidClick: true,
      message: '加载中...',
    })
    return config
  },
  (error) => {
    throw new Error(error)
  }
)

// response interceptor
server.interceptors.response.use(
  (response) => {
    Toast.clear()
    removePendingRequest(response.config)
    if (response.data.code === 402 || response.data.code === 403) {
      Toast.fail(response.data.msg)
      return
    } else if (response.status === 200) {
      return response.data
    } else {
      Toast.fail(response.data.msg || '数据异常')
    }
  },
  (error) => {
    Toast.fail('系统繁忙')
    removePendingRequest(error.config || {})
    throw new Error(error)
  }
)

import axios from "axios"
import store from "@/store"
import { Toast } from "antd-mobile"
import { customHistory } from "./history"

export const baseURL = process.env.REACT_APP_URL

const http = axios.create({
  baseURL,
  timeout: 5000,
})
//请求拦截器
http.interceptors.request.use((config) => {
  const {
    login: { token },
  } = store.getState()
  if (!config.url?.startsWith("/authorizations")) {
    config.headers!.Authorization = "Bearer " + token
  }
  return config
})
//响应拦截器
http.interceptors.response.use(undefined, (error) => {
  if (!error.response) {
    Toast.show({
      content: "网络繁忙，请稍后再试",
      duration: 1000
    })
    return Promise.reject(error)
  }
  if (error.response.status === 401) {
    Toast.show({
      content: "登陆超时，请重新登陆",
      duration: 1000,
      afterClose: () => {
        customHistory.push("/login", {
          from: customHistory.location.pathname,
        })
        //触发action
        // store.dispatch<any>(loginOutAsyncAction())
      }
    })
    
  }
  return Promise.reject(error)
})
export { http }

import axios from "axios"
import store from "@/store"
import { Toast } from "antd-mobile"
import { customHistory } from "./history"
import { logoutAsyncAction } from "@/store/actions/login"
import { setToken } from "./token"

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
http.interceptors.response.use(undefined, async (error) => {
  if (!error.response) {
    Toast.show({
      content: "网络繁忙，请稍后再试",
      duration: 1000,
    })
    return Promise.reject(error)
  }
  if (error.response.status === 401) {
    //无感刷新token
    try {
      //先判断redux种是否有refresh——token
      const { refresh_token } = store.getState().login
      if (!refresh_token) {
        await Promise.reject(error)
      } else {
        //用refresh_token,用refresh_token换取新的token
        const res = await axios.put(`${baseURL}/v1_0/authorizations`, null, {
          headers: {
            Authorization: "Bearer " + refresh_token,
          },
        })
        const login = {
          token: res.data.data.token,
          refresh_token,
        }
        setToken(login)
        store.dispatch({ type: "login/token", payload: login })
        // 继续完成原来的操作
        return http(error.config)
      }
    } catch (error) {
      Toast.show({
        content: "登陆超时，请重新登陆",
        duration: 1000,
        afterClose: () => {
          customHistory.push("/login", {
            from: customHistory.location.pathname,
          })
          //触发action
          store.dispatch<any>(logoutAsyncAction())
        },
      })
      return Promise.reject(error)
    }
  }
  return Promise.reject(error)
})
export { http }

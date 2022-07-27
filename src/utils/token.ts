import { Token } from "@/types/data"

const GEEK_TOKEN_KEY = 'geek-h5-token'
//创建获取token
//因为token存储的是对象，此处默认值也是对象'{}'
export const getToken = ():Token=>JSON.parse(localStorage.getItem(GEEK_TOKEN_KEY )??'{"token":"","refresh_token":""}')

// 创建设置token
export const setToken = (token:Token)=>localStorage.setItem(GEEK_TOKEN_KEY ,JSON.stringify(token))

//创建 清楚 token
export const clearToken = ()=>localStorage.removeItem(GEEK_TOKEN_KEY )

//是否登陆
export const isAuth = ()=>!!getToken().token
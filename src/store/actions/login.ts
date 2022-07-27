import { LoginForm } from "@/pages/Login"
import { ResponseData, Token } from "@/types/data"
import { ActionCreator, RootThunkAction } from "@/types/store"
import { clearToken, http, setToken } from "@/utils"

export const loginAsyncAction = (data: LoginForm): RootThunkAction => {
  return async (dispatch) => {
    const res = await http.post<ResponseData<Token>>(
      "/v1_0/authorizations",
      data
    )
    const { data: token } = res.data
    //存token
    setToken(token)
    //分发action
    dispatch(loginCreator(token))
  }
}
export const getCodeAsyncAction = (mobile: string): RootThunkAction => {
  return async () => {
    await http.get(`/v1_0/sms/codes/${mobile}`)
  }
}
export const loginCreator: ActionCreator<Token> = (payload) => ({
  type: "login/token",
  payload,
})
//退出
export const logoutAsyncAction = (): RootThunkAction => {
  return async (dispatch) => {
    //存token
    clearToken()
    //分发action
    dispatch(
      loginCreator({
        token: "",
        refresh_token: "",
      })
    )
  }
}

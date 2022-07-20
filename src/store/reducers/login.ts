import { Token } from "@/types/data"
import { action } from "@/types/store"
import { getToken } from "@/utils"

const initialState: Token =getToken()|| {
  token: "",
  refresh_token: "",
}
export const login = (state:Token = initialState, action: action<Token>): Token => {
  switch (action.type) {
    case "login/token":
      return action.payload
    default:
      return state
  }
}

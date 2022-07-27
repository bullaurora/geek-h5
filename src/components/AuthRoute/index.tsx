import { RootStore } from "@/types/store"
import { isAuth } from "@/utils"
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

export type PropType = {
  children: React.ReactElement

}
const AuthRoute: React.FC<PropType> = ({ children }) => {
  const token = useSelector<RootStore>((state) => state.login.token)
  const location = useLocation()
  if (token && isAuth()) {
    return children
  } else {
    return <Navigate to={'/login'} state={{ from: location.pathname }} />
  }
}

export default AuthRoute

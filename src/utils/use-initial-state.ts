import useMyDispatch from "@/store/useMyDispatch"
import type { RootStore } from "@/types/store"
import { useEffect } from "react"
import { useSelector } from "react-redux"

/**
 *进入页面获取数据
 * @param action
 * @param stateName
 * @return 要获取的状态
 */
export const useInitialState = <StateName extends keyof RootStore>(action: () => any, stateName:StateName):RootStore[StateName] => {
  const dispatch = useMyDispatch()
  const state = useSelector<RootStore,RootStore[StateName]>((state) => state[stateName])

  useEffect(() => {
    dispatch(action())
  }, [dispatch, action])

  return state
}

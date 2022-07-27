import useMyDispatch from "@/store/useMyDispatch"
import type { RootStore } from "@/types/store"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import {useMemoizedFn} from 'ahooks'

/**
 *进入页面获取数据
 * @param action
 * @param stateName
 * @param afterAction
 * @return 要获取的状态
 */

export const useInitialState = <StateName extends keyof RootStore>(
  action: () => any,
  stateName: StateName,
  afterAction = ()=>{}
): RootStore[StateName] => {
  const fn = useMemoizedFn(afterAction)
  const dispatch = useMyDispatch()
  const state = useSelector<RootStore, RootStore[StateName]>(
    (state) => state[stateName]
  )

  useEffect(() => {
    const loadData = async () => {
      await dispatch(action())
      fn()
    }
    loadData()
  }, [dispatch, action,fn])

  return state
}

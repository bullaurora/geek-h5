//redux相关类型
import type { ThunkAction, ThunkDispatch } from "redux-thunk"
import store from "@/store"
import type { RootResData } from "./data"
export type RootStore = ReturnType<typeof store.getState>

export type RootThunkAction = ThunkAction<
  void,
  RootStore,
  unknown,
  action<RootResData>
>
//ThunkDispatch
export type AppThunkDispatch = ThunkDispatch<
  RootSate,
  unknown,
  action<RootResData>
>
export type actionType = "login/token" | "user/get" | "profile/getUserProfile"
export type action<P> = {
  type: actionType
  payload: P
}

export type ActionCreator<P> = (payload: P) => action<P>
export type ReducerCreator<P, A = action<P>> = (state: P, action: A) => P

export type profileAction =
  | {
      type: "user/get"
      payload: User
    }
  | {
      type: "profile/getUserProfile"
      payload: UserEditor
    }

//大佬代码

// type UnionToIntersection<U> = (
//   U extends any ? (arg: U) => any : never
// ) extends (arg: infer I) => void
//   ? I
//   : never

// type UnionToTuple<T> = UnionToIntersection<
//   T extends any ? (t: T) => T : never
// > extends (_: any) => infer W
//   ? [...UnionToTuple<Exclude<T, W>>, W]
//   : []

// type GetKeyMapUnion<T extends any[], U extends any[]> = T extends [
//   infer FirstType,
//   ...infer RestType
// ]
//   ? U extends [infer FirstPayload, ...infer RestPayload]
//     ?
//         | { type: FirstType; payload: FirstPayload }
//         | GetKeyMapUnion<RestType, RestPayload>
//     : never
//   : never

// export type RootActionType = GetKeyMapUnion<
//   UnionToTuple<actionType>,
//   UnionToTuple<RootResData>
// >

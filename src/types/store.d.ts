//redux相关类型
import type { ThunkAction, ThunkDispatch } from "redux-thunk"
import store from "@/store"
import type { ArtComment, ArticleComment, ArticleDetail, ArticleList, ArticleListPayload, RootResData, Suggestion, SuggestionResult } from "./data"
import { updateUserType } from "@/store/actions/profile"
import { Channel } from "@/types/data"
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
export type actionType =
  | "login/token"
  | "user/get"
  | "profile/getUserProfile"
  | "profile/update"
  | "profile/photo"
  | "home/getChannels"
  | "home/getRestChannels"
  | "home/toggleChannel"
  | "home/delChannel"
  | "home/addChannel"
  | "home/getArticleListByChannelId"
  | "home/getNewestArticleList"
  | "search/suggestion"
  | "search/getSuggestionResult"
  | "search/clearSuggestion"
  | "search/getSuggestionResult"
  | 'article/getArticleById'
  | 'article/update'
  | 'article/getArticleComments'
  | 'article/getArticleCommentsFirst'
  | 'article/addArticleComment'
  | 'artilce/articleCommentThumbUp'
  | 'article/updateCommentCount'
export type action<P> = {
  type: actionType
  payload: P
}

export type UnionAction<T, P> = {
  type: T
  payload: P
}

export type ActionCreator<P> = (payload: P) => action<P>

export type loginAction = UnionAction<"login/token", Token>
export type profileAction =
  | UnionAction<"user/get", User>
  | UnionAction<"profile/getUserProfile", UserEditor>
  | UnionAction<"profile/update", updateUserType>
  | UnionAction<"profile/photo", string>

export type UnionHomeActionType =
  | UnionAction<"home/getChannels", Channel[]>
  | UnionAction<"home/getRestChannels", Channel[]>
  | UnionAction<"home/toggleChannel", number>
  | UnionAction<"home/delChannel", Channel>
  | UnionAction<"home/addChannel", Channel>
  | UnionAction<"home/getArticleListByChannelId", ArticleListPayload>
  | UnionAction<"home/getNewestArticleList", ArticleListPayload>

export type SearchAction =
  | UnionAction<"search/suggestion", Suggestion["options"]>
  | UnionAction<"search/clearSuggestion", []>
  | UnionAction<"search/getSuggestionResult", SuggestionResult>

  // 文章详情相关的 action 类型
export type ArticleAction =
| {
    type: 'article/getArticleById'
    payload: ArticleDetail
  }
| {
    type: 'article/update'
    payload: {
      // 要修改的键
      name: 'is_followed' | 'is_collected' | 'attitude'
      // 值
      // is_followed 和 is_collected 的值为：布尔值
      // attitude 数值
      value: boolean | number
    }
  }
| {
    type: `article/${'getArticleComments' | 'getArticleCommentsFirst'}`
    payload: ArticleComment
  }
| {
    type: 'article/addArticleComment'
    payload: ArtComment
  }
| {
    type: 'artilce/articleCommentThumbUp'
    payload: {
      id: string
      is_liking: boolean
    }
  }
| {
    type: 'article/updateCommentCount'
    payload: {
      commentId: string
      total: number
    }
  }

export type UnionRootAction = loginAction | profileAction | UnionHomeActionType | ArticleAction

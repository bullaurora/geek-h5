import { updateUserType } from "@/store/actions/profile"

//所有跟接口相关的数据的类型
interface ResponseData<D> {
  message: string
  data: D
}

//接口返回的数据类型
export type Token = {
  token: string
  refresh_token: string
}
//Profile页面的数据类型

export type User = {
  id: string
  name: string
  photo: string
  art_count: number
  follow_count: number
  fans_count: number
  like_count: number
}
//编辑时的个人信息
export type UserEditor = {
  id: string
  name: string
  photo: string
  mobile: string
  gender: string
  birthday: string
  intro?: string
}
export type ProfileType = {
  user: User
  userProfile: UserEditor
}
export type UserPhoto = {
  id?: string
  photo: string
}
/* 首页数据 频道数据*/
type Channel = {
  id: number
  name: string
}
export interface ChannelList {
  channels: Channel[]
}
/* 首页文章列表数据 */
export type Article = {
  art_id: string
  title: string
  aut_id: string
  aut_name: string
  // 接口返回的值 number 类型
  comm_count: number
  pubdate: string
  cover: {
    // 接口文档给的 string，此处，我们先设置为 number
    // type: number
    type: 0 | 1 | 3
    images: string[]
  }
}
export type ArticleList = {
  pre_timestamp: string | null
  results: Article[]
}
// 搜索联想关键词
export type Suggestion = {
  options: string[]
}
// 搜索结果
export type SuggestionResult = {
  page: number
  per_page: number
  results: Article[]
  total_count: number
}
// -- 文章详情 --
export type ArticleDetail = {
  art_id: string
  title: string
  pubdate: string
  aut_id: string
  aut_name: string
  aut_photo: string
  is_followed: boolean
  attitude: number
  content: string
  is_collected: boolean
  // 接口中缺失
  comm_count: number
  like_count: number
  read_count: number
}
export type ArticleDetailResponse = ResponseData<ArticleDetail>
// 评论项的类型
export type ArtComment = {
  com_id: string
  aut_id: string
  aut_name: string
  aut_photo: string
  like_count: number
  reply_count: number
  pubdate: string
  content: string
  is_liking: boolean
  is_followed: boolean
}
// 文章评论的类型
export type ArticleComment = {
  total_count: number
  end_id: string | null
  last_id: string | null
  results: ArtComment[]
}
export type ArticleCommentResponse = ResponseData<ArticleComment>
// 文章发布评论的类型
// 注意：接口文档中的返回类型与后台接口返回数据不一致
export type AddArticleCommnet = {
  com_id: string
  new_obj: ArtComment
  target: string
}
export type AddArticleCommnetResponse = ResponseData<AddArticleCommnet>
export type ArticleListPayload = { channelId: number; articles: ArticleList }
export type CombineUser = User | UserEditor | UserPhoto | string
export type HomeType = Channel[] | number | Channel | ArticleListPayload
export type UnionSuggest = Suggestion["options"] | SuggestionResult
export type UnionArticle =
  | ArticleDetail
  | {
      // 要修改的键
      name: "is_followed" | "is_collected" | "attitude"
      // 值
      // is_followed 和 is_collected 的值为：布尔值
      // attitude 数值
      value: boolean | number
    }
  | ArticleComment
  | ArtComment
  | {
      id: string
      is_liking: boolean
    }
  | {
      commentId: string
      total: number
    }
export type RootResData =
  | Token
  | updateUserType
  | CombineUser
  | HomeType
  | UnionSuggest
  | UnionArticle

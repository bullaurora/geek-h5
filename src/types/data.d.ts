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
  intro?:string
}
export type ProfileType = {
  user: User
  userProfile:UserEditor
}
export type CombineUser = User | UserEditor
export type RootResData = Token | User | UserEditor

import { ResponseData, User,UserEditor, UserPhoto } from "@/types/data";
import { ActionCreator, RootThunkAction } from "@/types/store";
import { http } from "@/utils";

export const getAsyncUser = ():RootThunkAction=>{
    return async dispatch=>{
       const res = await http.get<ResponseData<User>>('/v1_0/user')
       dispatch(userCreator(res.data.data))
    }
}
//获取编辑个人信息页面数据
export const getUserAsyncProfile = ():RootThunkAction=>{
    return async dispatch=>{
        const res = await http.get<ResponseData<UserEditor>>('/v1_0/user/profile')
        dispatch(userProfileCreator(res.data.data))
    }
}
//修改用户个人资料的action
export type updateUserType = Partial<Pick<UserEditor,'name'|'intro'|'gender'|'birthday'>>
export const updateAsyncUser = (updateUser:updateUserType):RootThunkAction =>{
    return async (dispatch,state)=>{
        await http.patch('/v1_0/user/profile',updateUser)
        dispatch(updateUserCreator(updateUser))
        
    }
}
//更新头像
export const updateAsyncPhoto = (FormData:FormData): RootThunkAction => {
    return async (dispatch)=>{
        const res = await http.patch<ResponseData<UserPhoto>>('/v1_0/user/photo',FormData)
          dispatch(updatePhotoCreator(res.data.data.photo))
            
    }
}
export const userCreator:ActionCreator<User>= (payload)=>({type:'user/get',payload})
export const userProfileCreator:ActionCreator<UserEditor>= (payload)=>({type:'profile/getUserProfile',payload})
export const updateUserCreator:ActionCreator<updateUserType>= (payload)=>({type:'profile/update',payload:payload})
export const updatePhotoCreator:ActionCreator<string>= (payload)=>({type:'profile/update',payload:payload})
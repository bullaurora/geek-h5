import { ResponseData, User,UserEditor } from "@/types/data";
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
export const userCreator:ActionCreator<User>= (payload)=>({type:'user/get',payload})
export const userProfileCreator:ActionCreator<UserEditor>= (payload)=>({type:'profile/getUserProfile',payload})
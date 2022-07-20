import {  ProfileType, User, UserEditor } from "@/types/data";
import { profileAction,  } from "@/types/store";
const initialState:ProfileType = {
    user:{} as User,
    userProfile:{} as UserEditor
}
export const profile = (state=initialState,action:profileAction):ProfileType=>{
    if (action.type==="user/get") {
        return {...state,user: action.payload }
    }
    if (action.type==='profile/getUserProfile') {
        return {...state,userProfile: action.payload}
    }
    return state
} 
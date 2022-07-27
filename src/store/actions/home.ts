import { ArticleList, ChannelList, ResponseData } from "@/types/data"
import { RootThunkAction } from "@/types/store"
import { http } from "@/utils"
import { Channel } from "@/types/data";
import differenceBy from 'lodash/differenceBy'
const CHANNEL_KEY = 'geek-h5-channels'
export const getAsyncChannels = (): RootThunkAction => {
  return async (dispatch,getState) => {
    const {login:{token}} = getState()
    let payload :Channel[]= []
    if (!!token) {
      const res = await http.get<ResponseData<ChannelList>>('/v1_0/user/channels')
      payload = res.data.data.channels
    } else {
      const localChannel = JSON.parse((localStorage.getItem(CHANNEL_KEY)??'[]')) as Channel[]
      if (localChannel.length ===0) {
        const res = await http.get<ResponseData<ChannelList>>('/v1_0/user/channels')
        payload = res.data.data.channels
        localStorage.setItem(CHANNEL_KEY, JSON.stringify(payload))
      }else {
        payload = localChannel
      }
    }
    dispatch({type:'home/getChannels',payload})  
  }
}
export const getRestAsyncChannels = (): RootThunkAction=>{
  return async (dispatch,getState) => {
    const {home:{channels}} = getState()
    const res =  await http.get<ResponseData<ChannelList>>('/v1_0/channels')
    const restChannels =  differenceBy(res.data.data.channels,channels,'id')
    dispatch({type:'home/getRestChannels',payload:restChannels})
  }
}
//切换频道高亮
export const toggleChannel = (id:number):RootThunkAction =>{
  return dispatch => dispatch( {type:'home/toggleChannel',payload:id})
}
export const delMyChannel = (channel:Channel):RootThunkAction =>{
  return async (dispatch,getState) => {
    const {login:{token}} = getState()
    if (!!token) {
     await  http.delete(`/v1_0/user/channels/${channel.id}`)
      
    }else {
      const localChannels = JSON.parse((localStorage.getItem(CHANNEL_KEY)??'[]')) as Channel[]
      const newChannels =  localChannels.filter(item=>item.id!==channel.id)
      localStorage.setItem(CHANNEL_KEY, JSON.stringify(newChannels))
    }
    dispatch({type:'home/delChannel',payload:channel})
  }
}

// 添加频道
export const addChannel = (channel: Channel): RootThunkAction=>{
  return async (dispatch,getState)=>{
    const {login:{token}} = getState()
    if (!!token) {
     await  http.patch(`/v1_0/user/channels`,{
      channels:[channel]
     })
      
    }else {
      const localChannels = JSON.parse((localStorage.getItem(CHANNEL_KEY)??'[]')) as Channel[]
      const newChannels =  localChannels.push(channel)
      localStorage.setItem(CHANNEL_KEY, JSON.stringify(newChannels))
    }
    dispatch({type:'home/addChannel',payload:channel})
  }
}


export const getArticleListByChannelId = (channelId:number,timestamp:string|null):RootThunkAction=>{
    return async (dispatch,getState) => {
      const res = await http.get<ResponseData<ArticleList>>('/v1_0/articles',{
        params:{
          channel_id: channelId,
          timestamp: timestamp
        }
      })
      dispatch({type:'home/getArticleListByChannelId',payload:{
        channelId,
        articles:res.data.data
      }})
    }
}

export const getNewestArticleList = (channelId:number,timestamp:string|null):RootThunkAction=>{
  return async (dispatch,getState) => {
    const res = await http.get<ResponseData<ArticleList>>('/v1_0/articles',{
      params:{
        channel_id: channelId,
        timestamp: timestamp
      }
    })
    dispatch({type:'home/getNewestArticleList',payload:{
      channelId,
      articles:res.data.data
    }})
  }
}
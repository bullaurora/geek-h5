import { ArticleList, Channel } from "@/types/data"
import { UnionHomeActionType } from "@/types/store"
import { sortBy } from "lodash"
export interface HomeState {
  channels: Channel[]
  restChannels: Channel[]
  channelActiveKey: number
  //所有频道的文章列表数据
  channelArticles: {
    [key in number]: ArticleList
  }
}
const initialState: HomeState = {
  channels: [],
  restChannels: [],
  channelActiveKey: 0,
  channelArticles: {},
}

export const home = (
  state = initialState,
  action: UnionHomeActionType
): HomeState => {
  if (action.type === "home/getChannels") {
    return {
      ...state,
      channels: action.payload,
    }
  }
  if (action.type === "home/getRestChannels") {
    return {
      ...state,
      restChannels: action.payload,
    }
  }
  if (action.type === "home/toggleChannel") {
    return {
      ...state,
      channelActiveKey: action.payload,
    }
  }
  if (action.type === "home/delChannel") {
    return {
      ...state,
      channels: state.channels.filter((item) => item.id !== action.payload.id),
      restChannels: sortBy([...state.restChannels, action.payload], "id"),
    }
  }
  if (action.type === "home/addChannel") {
    return {
      ...state,
      channels: [...state.channels, action.payload],
      restChannels: state.restChannels.filter(
        (item) => item.id !== action.payload.id
      ),
    }
  }
  if (action.type === "home/getArticleListByChannelId") {
    const {
      channelId,
      articles: { pre_timestamp, results },
    } = action.payload

    const currentResults = state.channelArticles[channelId]?.results ?? []

    return {
      ...state,
      // 只修改：频道文章列表数据
      channelArticles: {
        // 展开所有频道的文章列表数据
        ...state.channelArticles,
        // 只修改当前频道的文章列表数据
        [channelId]: {
          pre_timestamp,

          // 注意：该数据要追加！！！
          results: [
            // 已有数据
            // ...currentArticles.results,
            ...currentResults,
            // 接口返回的最新的文章列表数据
            ...results,
          ],
        },
      },
    }
  }
  if (action.type === "home/getNewestArticleList") {
    const {
      channelId,
      articles: { pre_timestamp, results },
    } = action.payload

    const currentResults = state.channelArticles[channelId]?.results ?? []

    return {
      ...state,
      // 只修改：频道文章列表数据
      channelArticles: {
        // 展开所有频道的文章列表数据
        ...state.channelArticles,
        // 只修改当前频道的文章列表数据
        [channelId]: {
          pre_timestamp,

          // 注意：该数据要追加！！！
          results: [
            // 已有数据
            // ...currentArticles.results,
            ...results,
            ...currentResults,
            // 接口返回的最新的文章列表数据
          ],
        },
      },
    }
  }
  return state
}

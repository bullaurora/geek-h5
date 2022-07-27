import { ResponseData, Suggestion, SuggestionResult } from "@/types/data"
import { RootThunkAction } from "@/types/store"
import { http } from "@/utils"

export const getSuggestion = (q: string): RootThunkAction => {
    return async dispatch => {
      const res = await http.get<ResponseData<Suggestion>>('/v1_0/suggestion', {
        params: {
          q
        }
      })
  
      dispatch({ type: 'search/suggestion', payload: res.data.data.options })
    }
  }
  
  // 清空联想关键词
  export const clearSuggestion = ()=> ({ type: 'search/clearSuggestion' ,payload:[]})
  
  // 搜索结果
  export const getSuggestionResult = (query: string): RootThunkAction => {
    return async dispatch => {
      const res = await http.get<ResponseData<SuggestionResult>>('/v1_0/search', {
        params: {
          page: 1,
          per_page: 10,
          q: query
        }
      })
  
      dispatch({ type: 'search/getSuggestionResult', payload: res.data.data })
    }
  }
  
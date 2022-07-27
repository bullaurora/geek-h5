import { Suggestion, SuggestionResult } from '@/types/data'
import { SearchAction } from '@/types/store'

type SearchState = {
  suggestion: Suggestion['options']
  suggestionResult: SuggestionResult
}

const initialState: SearchState = {
  suggestion: [],
  // 此处，为该对象，初始化默认值
  suggestionResult: {
    page: 1,
    per_page: 10,
    total_count: 0,
    results: []
  }
}

export const search = (
  state = initialState,
  action: SearchAction
): SearchState => {
  if (action.type === 'search/suggestion') {
    return {
      ...state,
      suggestion: action.payload
    }
  }

  if (action.type === 'search/clearSuggestion') {
    return {
      ...state,
      suggestion: []
    }
  }

  // 注意：此处，并没有考虑 搜索结果分页，所以，直接使用 action.payload 来覆盖了数据
  //      也就是说，如果要考虑分析，就需要追加 results 数据
  if (action.type === 'search/getSuggestionResult') {
    return {
      ...state,
      suggestionResult: action.payload
    }
  }

  return state
}

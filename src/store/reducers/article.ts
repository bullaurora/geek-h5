import { ArticleComment, ArticleDetail } from '@/types/data'
import { ArticleAction } from '@/types/store'

type ArticleState = {
  detail: ArticleDetail
  comments: ArticleComment
}

const initialState = {
  // 文章详情
  detail: {},
  comments: {
    // 注意：为了让 InfiniteScroll 组件在第一次加载时，也能够帮我们加载评论数据
    //      此处，刻意的将 end_id 和 last_id 设置为不同的默认值
    //      这样，hasMore 的条件 end_id !== last_id 结果就为 true，那么，InfiniteScroll 组件就可以在第一次加载数据了
    end_id: null,
    last_id: null,
    total_count: 0,
    results: [] as ArticleComment['results']
  }
} as ArticleState

export const article = (
  state = initialState,
  action: ArticleAction
): ArticleState => {
  if (action.type === 'article/getArticleById') {
    return {
      ...state,
      detail: action.payload
    }
  }

  // 复用：关注作者、收藏文章、文章点赞
  if (action.type === 'article/update') {
    const { name, value } = action.payload
    return {
      ...state,
      detail: {
        ...state.detail,
        [name]: value
      }
    }
  }

  if (action.type === 'article/getArticleComments') {
    const { end_id, last_id, results, total_count } = action.payload
    return {
      ...state,
      comments: {
        end_id,
        last_id,
        total_count,
        // 注意：该数据需要追加，而不是直接覆盖，这样，才能实现触底加载更多评论的数据
        results: [...state.comments.results, ...results]
      }
    }
  }

  // 第一次获取评论数据
  if (action.type === 'article/getArticleCommentsFirst') {
    return {
      ...state,
      comments: action.payload
    }
  }

  if (action.type === 'article/addArticleComment') {
    return {
      ...state,
      comments: {
        ...state.comments,
        // 最新发表的评论在第一条
        results: [action.payload, ...state.comments.results]
      }
    }
  }

  if (action.type === 'artilce/articleCommentThumbUp') {
    const { id, is_liking } = action.payload
    return {
      ...state,
      comments: {
        ...state.comments,
        results: state.comments.results.map(item => {
          if (item.com_id === id) {
            return {
              ...item,
              // 点赞状态值
              is_liking: is_liking,
              // 修改数量
              like_count: is_liking ? item.like_count + 1 : item.like_count - 1
            }
          }
          return item
        })
      }
    }
  }

  if (action.type === 'article/updateCommentCount') {
    return {
      ...state,
      comments: {
        ...state.comments,
        results: state.comments.results.map(item => {
          if (item.com_id === action.payload.commentId) {
            return {
              ...item,
              reply_count: action.payload.total
            }
          }
          return item
        })
      }
    }
  }

  return state
}

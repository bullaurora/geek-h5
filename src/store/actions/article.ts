import {
  AddArticleCommnetResponse,
  ArticleCommentResponse,
  ArticleDetailResponse
} from '@/types/data'
import { RootThunkAction } from '@/types/store'
import { http } from '@/utils/http'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)

// 获取文章详情
export const getArticleById = (id: string): RootThunkAction => {
  return async dispatch => {
    const res = await http.get<ArticleDetailResponse>(`/v1_0/articles/${id}`)

    dispatch({
      type: 'article/getArticleById',
      payload: {
        ...res.data.data,
        // 注意：此处需要使用 本地化格式，才能展示：2019年3月11日
        pubdate: dayjs(res.data.data.pubdate).format('LL')
      }
    })
  }
}

// 关注文章作者
export const followAuthor = (
  authorId: string,
  isFollowed: boolean
): RootThunkAction => {
  return async dispatch => {
    if (isFollowed) {
      // 说明：现在已经是关注的状态，所以，此时要取消关注
      await http.delete(`/v1_0/user/followings/${authorId}`)
    } else {
      // 说明：现在还没有关注，所以，此时要关注作者
      await http.post('/v1_0/user/followings', {
        target: authorId
      })
    }

    dispatch({
      type: 'article/update',
      payload: {
        name: 'is_followed',
        value: !isFollowed
      }
    })
  }
}

// 收藏或取消收藏文章
export const collectArticle = (
  art_id: string,
  is_collected: boolean
): RootThunkAction => {
  return async dispatch => {
    if (is_collected) {
      // 说明：当前是已收藏，此时，要取消收藏
      await http.delete(`/v1_0/article/collections/${art_id}`)
    } else {
      // 说明：当前是未收藏，此时，要收藏
      await http.post('/v1_0/article/collections', {
        target: art_id
      })
    }

    dispatch({
      type: 'article/update',
      payload: {
        name: 'is_collected',
        value: !is_collected
      }
    })
  }
}

// 点赞或取消点赞文章
export const likeArticle = (
  art_id: string,
  attitude: number
): RootThunkAction => {
  return async dispatch => {
    if (attitude === 1) {
      // 说明：当前是点赞，此时，要取消点赞
      await http.delete(`/v1_0/article/likings/${art_id}`)
    } else {
      // 说明：当前是未点赞，此时，要点赞
      await http.post('/v1_0/article/likings', {
        target: art_id
      })
    }

    dispatch({
      type: 'article/update',
      payload: {
        name: 'attitude',
        value: attitude === 1 ? 0 : 1
      }
    })
  }
}

// 获取文章评论数据
// type 用来指定获取的是 文章的评论 还是 评论的回复
// targetId 表示文章 或 评论的id
// offset 表示获取下一页的起始 id，对应接口返回数据的 last_id，
//           将来接口会根据该数据获取该 last_id 后面，也就是下一页的数据
export const getArticleComments = (
  type: string,
  targetId: string,
  offset: string | null
): RootThunkAction => {
  return async dispatch => {
    const res = await http.get<ArticleCommentResponse>('/v1_0/comments', {
      params: {
        type,
        source: targetId,
        offset
      }
    })

    dispatch({
      type: 'article/getArticleComments',
      payload: res.data.data
    })
  }
}

// 第一次获取评论数据：覆盖数据
export const getArticleCommentsFirst = (
  type: string,
  targetId: string,
  offset: string | null
): RootThunkAction => {
  return async dispatch => {
    const res = await http.get<ArticleCommentResponse>('/v1_0/comments', {
      params: {
        type,
        source: targetId,
        offset
      }
    })

    dispatch({
      type: 'article/getArticleCommentsFirst',
      payload: res.data.data
    })
  }
}

// 发表评论
export const addArticleComment = (
  art_id: string,
  value: string
): RootThunkAction => {
  return async dispatch => {
    const res = await http.post<AddArticleCommnetResponse>('/v1_0/comments', {
      target: art_id,
      content: value
    })

    dispatch({
      type: 'article/addArticleComment',
      payload: res.data.data.new_obj
    })
  }
}

// 对评论进行点赞
export const articleCommentThumbUp = (
  com_id: string,
  is_liking: boolean
): RootThunkAction => {
  return async disaptch => {
    if (!is_liking) {
      // 说明：当前未点赞，此时，要点赞
      await http.post('/v1_0/comment/likings', {
        target: com_id
      })
    } else {
      // 说明：当前已点赞，此时，要取消点赞
      await http.delete(`/v1_0/comment/likings/${com_id}`)
    }

    disaptch({
      type: 'artilce/articleCommentThumbUp',
      payload: {
        id: com_id,
        is_liking: !is_liking
      }
    })
  }
}

// 更新某个评论项的回复数量
export const updateCommentCount = (
  commentId: string,
  total: number
): RootThunkAction => {
  return async dispatch => {
    dispatch({
      type: 'article/updateCommentCount',
      payload: {
        commentId,
        total
      }
    })
  }
}

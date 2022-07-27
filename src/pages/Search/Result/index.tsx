import { useNavigate, useLocation, useSearchParams } from "react-router-dom"
import { NavBar } from "antd-mobile"

import ArticleItem from "@/components/ArticleItem"

import styles from "./index.module.scss"
import { useInitialState } from "@/utils/use-initial-state"
import { getSuggestionResult } from "@/store/actions/search"
import { useCallback } from "react"

const Result = () => {
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location);
  
  // 用来获取查询参数

  const params = new URLSearchParams(location.search)
  // 注意：获取 查询参数 时，有可能拿不到，此时，设置默认值为 空字符串
  const query = params.get("query") ?? ""
  const getSuggestionResultCall = useCallback(() => getSuggestionResult(query),[query])

  // 注意：此处在将数据存储到 redux 后，代码出 Bug 了
  //      Bug 表现：一停不停的发送请求
  // const fn = () => getSuggestionResult(query)
  // useInitialState(fn, 'search')
  const { suggestionResult } = useInitialState(
    getSuggestionResultCall,
    "search"
  )

  const { results } = suggestionResult

  // console.log('组件重新渲染了：', query)
  // 渲染搜索结果
  const renderArticleList = () => {
    return results.map((item, index) => {
      const {
        title,
        pubdate,
        comm_count,
        aut_name,
        art_id,
        cover: { type, images },
      } = item

      const articleData = {
        title,
        pubdate,
        comm_count,
        aut_name,
        type,
        images,
      }

      return (
        <div
          key={index}
          className="article-item"
          onClick={() => navigate(`/articles/${art_id}`)}
        >
          <ArticleItem {...articleData} />
        </div>
      )
    })
  }

  // 如果需要实现分页效果，可以通过以下方式来判断是否有更多数据
  // const hasMore = page * per_page < total_count
  // 然后，loadMore 时，每次，都让 page + 1 来获取下一页数据

  return (
    <div className={styles.root}>
      <NavBar onBack={() => navigate(-1)}>搜索结果</NavBar>
      <div className="article-list">{renderArticleList()}</div>
    </div>
  )
}

export default Result

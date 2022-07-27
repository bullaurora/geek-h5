import { Tabs, Popup } from 'antd-mobile'
import { Icon } from '@/components/Icon'
import styles from './index.module.scss'
import { useInitialState } from '@/utils/use-initial-state'
import { useState } from 'react'
import { getAsyncChannels, toggleChannel } from '@/store/actions/home'
import { useNavigate } from 'react-router-dom'
import Channels from './Channels'
import useMyDispatch from '@/store/useMyDispatch'
import ArticleList from './components/ArticleList'
const Home = () => {
  const {channels,channelActiveKey} = useInitialState(getAsyncChannels,'home')
  const [channelVisible, setChannelVisible] = useState(false)
  const navigate = useNavigate()
  const dispatch = useMyDispatch()
  // 频道管理弹出层展示
  const onChannelShow = () => setChannelVisible(true)
  // 频道管理弹出层隐藏
  const onChannelHide = () => setChannelVisible(false)
  // 切换 tab
  const changeTab = (key: string) => {
    dispatch(toggleChannel(+key))
  }

  return (
    <div className={styles.root}>
  
      {channels.length > 0 && (
        <Tabs
          className="tabs"
          activeLineMode="fixed"
          activeKey={channelActiveKey + ''}
          onChange={changeTab}
        >
          {channels.map(item => (
  
            <Tabs.Tab forceRender title={item.name} key={item.id}>
            
              <ArticleList channelId={item.id} />
            </Tabs.Tab>
          ))}
        </Tabs>
      )}
      <div className="tabs-opration">
        <Icon type="iconbtn_search" onClick={() => navigate('/search')} />
        <Icon type="iconbtn_channel" onClick={onChannelShow} />
      </div>
      {/* 频道管理 - 弹出层 */}
      <Popup visible={channelVisible} className="channel-popup" position="left">
        <Channels onClose={onChannelHide} />
      </Popup>
    </div>
  )
}

export default Home



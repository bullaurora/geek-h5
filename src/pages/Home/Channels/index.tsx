import classNames from "classnames"
import { Icon } from "@/components/Icon"
import styles from "./index.module.scss"
import { useDispatch, useSelector } from "react-redux"
// import { RootState } from '@/types/store'
import { useInitialState } from "@/utils/use-initial-state"
import { useState } from "react"
import { Channel } from "@/types/data"
import { RootStore } from "@/types/store"
import { addChannel, delMyChannel, getRestAsyncChannels, toggleChannel } from "@/store/actions/home"
import useMyDispatch from "@/store/useMyDispatch"

type Props = {
  onClose: () => void
}


const Channels = ({ onClose }: Props) => {
  const dispatch = useMyDispatch()
  // 是否为编辑状态
  const [isEdit, setIsEdit] = useState(false)
  const { channels,channelActiveKey } = useSelector((state: RootStore) => state.home)
  const {restChannels} = useInitialState(getRestAsyncChannels,'home')



  // 切换编辑状态
  const changeEdit = () => {
    setIsEdit(!isEdit)
  }

  // 切换频道
  const onChannelClick = (channel: Channel) => {
    if (!isEdit) {
      // 不是编辑状态，就执行切换频道操作
      dispatch(toggleChannel(channel.id))
      // 关闭弹窗层
      onClose()
    } else {
      // 是编辑状态，执行删除频道操作
      // console.log('删除频道')
      // 判断是否为推荐频道 或 长度小于等于4
      if (channel.id === 0) return
      if (channels.length <= 4) return
      // 如果是当前选中项也不允许删除
      if (channel.id === channelActiveKey) return
      dispatch(delMyChannel(channel))
    }
  }

  // 添加频道
  const onAddChannel = (channel: Channel) => {
    dispatch(addChannel(channel))
  }

  return (
    <div className={styles.root}>
      <div className="channel-header">
        <Icon type="iconbtn_channel_close" onClick={onClose} />
      </div>
      <div className="channel-content">
        {/* 编辑时，添加类名 edit */}
        <div className={classNames("channel-item", isEdit && "edit")}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">点击进入频道</span>
            <span className="channel-item-edit" onClick={changeEdit}>
              {isEdit ? "保存" : "编辑"}
            </span>
          </div>
          <div className="channel-list">
            {channels.map((item) => (
              <span
                key={item.id}
                className={classNames(
                  "channel-list-item",
                  channelActiveKey === item.id && 'selected'
                )}
                onClick={() => onChannelClick(item)}
              >
                {item.name}
                {item.id !== 0 && item.id !== channelActiveKey && (
                  <Icon type="iconbtn_tag_close" />
                )}
              </span>
            ))}
          </div>
        </div>

        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">可选频道</span>
            <span className="channel-item-title-extra">点击添加频道</span>
          </div>
          <div className="channel-list">
            {restChannels.map(item => (
              <span
                className="channel-list-item"
                key={item.id}
                onClick={() => onAddChannel(item)}
              >
                + {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channels

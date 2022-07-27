import { RootStore } from "@/types/store"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { io, Socket } from "socket.io-client"
import styles from "./index.module.scss"
import classNames from "classnames"
import { Icon } from "@/components/Icon"
import { Input, NavBar } from "antd-mobile"
import { useNavigate } from "react-router-dom"
type ChatType = {
  message: string
  type: "user" | "xz"
}

const Chat: React.FC = () => {
  const [chatList, setChatList] = useState<ChatType[]>([])
  const [value, setValue] = useState("")
  const { token } = useSelector((state: RootStore) => state.login)
  const socketRef = useRef<Socket>()
  const chatListRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  useEffect(() => {
    const socketio = io("http://toutiao.itheima.net", {
      query: {
        token,
      },
      transports: ["websocket"],
    })
    socketio.on("connect", () => {
      setChatList([
        { type: "xz", message: "你好，我是小智" },
        { type: "xz", message: "你有什么疑问？" },
      ])
    })
    socketio.on("message", (data) => {
      setChatList((chatList) => [
        ...chatList,
        {
          type: "xz",
          message: data.msg,
        },
      ])
    })
    socketRef.current = socketio
    return () => {
      socketRef.current!.close()
    }
  }, [token])
  const onSend = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code !== "Enter" || value.trim() === "") return
    // 发送消息给服务器
    socketRef.current?.emit("message", {
      msg: value,
      timestamp: Date.now() + "",
    })

    setChatList([
      ...chatList,
      {
        type: "user",
        message: value,
      },
    ])

    setValue("")
  }
  useEffect(() => {
    const chatListDOM = chatListRef.current
    if (!chatListDOM) return
    console.log(chatListDOM.scrollTop,chatListDOM.scrollHeight);
    
    chatListDOM.scrollTop = chatListDOM.scrollHeight
  }, [chatList])
  return (
    <div className={styles.root}>
      <NavBar className="fixed-header" onBack={() => navigate(-1)}>
        小智同学
      </NavBar>
      <div className="chat-list" ref={chatListRef}>
        {chatList.map((item, index) => {
          return (
            <div
              key={index}
              className={classNames(
                "chat-item",
                item.type === "xz" ? "self" : "user"
              )}
            >
              {item.type === "xz" ? (
                <Icon type="iconbtn_xiaozhitongxue" />
              ) : (
                <img
                  src="http://geek.itheima.net/images/user_head.jpg"
                  alt=""
                />
              )}
              <div className="message">{item.message}</div>
            </div>
          )
        })}
      </div>
      <div className="input-footer">
        <Input
          className="no-border"
          placeholder="请描述您的问题"
          value={value}
          onChange={(value) => setValue(value)}
          onKeyDown={onSend}
        />
      </div>
    </div>
  )
}
export default Chat

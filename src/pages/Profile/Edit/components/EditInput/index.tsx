import { Input, NavBar, TextArea } from "antd-mobile"
import { useState } from "react"
import { UpdateInputType } from "../.."

import styles from "./index.module.scss"

// 为 EditInput 组件指定 props 类型
type Props = {
  onClose: () => void
  value: string
  type: UpdateInputType
  onUpdateProfile: (type: UpdateInputType, value: string) => void
}

const EditInput: React.FC<Props> = ({
  onClose,
  value,
  onUpdateProfile,
  type,
}) => {
  const [inputValue, setInputValue] = useState(value)
  // 创建变量，用来表示是否为修改昵称
  const isEditName = type === "name"
  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        right={
          <span
            className="commit-btn"
            onClick={() => {
              if (type === "") return
              onUpdateProfile(type, inputValue)
            }}
          >
            提交
          </span>
        }
        onBack={onClose}
      >
        编辑{isEditName ? "昵称" : "简介"}
      </NavBar>

      <div className="edit-input-content">
        <h3>{isEditName ? "昵称" : "简介"}</h3>

        {isEditName ? (
          <div className="input-wrap">
            <Input
              value={inputValue}
              onChange={(value) => setInputValue(value)}
              placeholder="请输入"
            />
          </div>
        ) : (
          <TextArea
            className="textarea"
            placeholder="请输入内容"
            value={inputValue}
            onChange={(value) => setInputValue(value)}
            rows={4}
            maxLength={100}
            showCount
          />
        )}
      </div>
    </div>
  )
}

export default EditInput

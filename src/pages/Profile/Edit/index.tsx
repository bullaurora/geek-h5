import { getUserAsyncProfile } from "@/store/actions/profile"
import { useNavigate } from "react-router-dom"
import { Button, DatePicker, List, NavBar, Popup } from "antd-mobile"
import styles from "./index.module.scss"
import { useInitialState } from "@/utils/use-initial-state"
import { useState } from "react"
import EditInput from "./components/EditInput"

const ProfileEdit = () => {
  const [inputVisible, setInputVisible] = useState(false)
  //更新用户昵称
  const onUpdateProfile = (type:string,inputValue:string)=>{
    console.log(inputValue);
    
  }
  const navigate = useNavigate()
  const { userProfile } = useInitialState(getUserAsyncProfile, "profile")
  const { /*id,*/ photo, name, intro, gender, birthday } = userProfile

  return (
    <div className={styles.root}>
      <div className="content">
        {/* 标题 */}
        <NavBar className="nav-bar" onBack={() => navigate(-1)}>
          个人信息
        </NavBar>

        <div className="wrapper">
          {/* 列表 */}
          <List className="profile-list">
            {/* 列表项 */}
            <List.Item
              // extra 表示右侧的额外信息
              extra={
                <span className="avatar-wrapper">
                  <img
                    width={24}
                    height={24}
                    src={
                      photo || "http://toutiao.itheima.net/images/user_head.jpg"
                    }
                    alt=""
                  />
                </span>
              }
              arrow
            >
              头像
            </List.Item>
            <List.Item arrow extra={name} onClick={() => setInputVisible(true)}>
              昵称
            </List.Item>
            <List.Item arrow extra={<span>{intro || "未填写"}</span>}>
              简介
            </List.Item>
          </List>

          <List className="profile-list">
            <List.Item arrow extra={gender + "" === "0" ? "男" : "女"}>
              性别
            </List.Item>
            <List.Item arrow extra={birthday}>
              生日
            </List.Item>
          </List>

          <DatePicker
            value={new Date(birthday)}
            title="选择年月日"
            min={new Date(1900, 0, 1, 0, 0, 0)}
            max={new Date()}

            // 当点击确定按钮时触发，通过参数可以拿到当前选中的日期（ 注意：JS 中的 Date 对象 ）
          />

          {/* 创建 input[type=file] 标签 */}
          <input type="file" style={{ display: "none" }} />
        </div>

        <div className="logout">
          <Button className="btn">退出登录</Button>
        </div>
      </div>

      {/* 修改昵称的弹窗层 */}
      {/* 
        解决无法正常展示简介信息的Bug的第 2 种方案
      */}
      <Popup visible={inputVisible} position="right" destroyOnClose>
        <EditInput
          onClose={() => setInputVisible(false)}
          type="name"
          value={name}
          onUpdateProfile={onUpdateProfile}
        />
      </Popup>
    </div>
  )
}
export default ProfileEdit

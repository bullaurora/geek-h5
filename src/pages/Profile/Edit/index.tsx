import {
  getUserAsyncProfile,
  updateAsyncPhoto,
  updateAsyncUser,
} from "@/store/actions/profile"
import { useNavigate } from "react-router-dom"
import {
  Button,
  DatePicker,
  Dialog,
  List,
  NavBar,
  Popup,
  Toast,
} from "antd-mobile"
import styles from "./index.module.scss"
import { useInitialState } from "@/utils/use-initial-state"
import { useRef, useState } from "react"
import EditInput from "./components/EditInput"
import useMyDispatch from "@/store/useMyDispatch"
import EditList from "./components/EditList"
import dayjs from "dayjs"
import { logoutAsyncAction } from "@/store/actions/login"
export type UpdateInputType = "name" | "intro" | ""
export type UpdateListType = "" | "gender" | "photo"
export type UnionUpdateType = UpdateInputType | UpdateListType | "birthday"
export type inputPopup = {
  type: UpdateInputType
  value: string
  visible: boolean
}
type ListPopup = {
  type: UpdateListType
  visible: boolean
}
const ProfileEdit: React.FC = () => {
  const [inputPopup, setInputPopup] = useState<inputPopup>({
    type: "",
    value: "",
    visible: false,
  })
  const [listPopup, setListPopup] = useState<ListPopup>({
    type: "",
    visible: false,
  })
  //生日日期选择器
  const [showBirthday, setShowBirthday] = useState(false)
  const dispatch = useMyDispatch()
  const navigate = useNavigate()
  const { userProfile } = useInitialState(getUserAsyncProfile, "profile")
  const { /*id,*/ photo, name, intro, gender, birthday } = userProfile
  const fileRef = useRef<HTMLInputElement>(null)
  //更新用户昵称
  const onUpdateProfile = async (type: UnionUpdateType, inputValue: string) => {
    if (type === "photo") {
      fileRef.current?.click()
    } else {
      await dispatch(updateAsyncUser({ [type]: inputValue }))
      Toast.show({
        content: "更新成功",
        duration: 800,
      })
      onClosePopup()
      onListHide()
    }
  }
  // 打开弹出层
  const onShowPopup = (type: UpdateInputType, value: string) =>
    setInputPopup({ type, value, visible: true })
  //关闭弹出层
  const onClosePopup = () =>
    setInputPopup({ type: "", value: "", visible: false })
  const onListShow = (type: UpdateListType) =>
    setListPopup({ type, visible: true })
  const onListHide = () => setListPopup({ type: "", visible: false })
  const onChangePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files)
      return Toast.show({
        content: "请选择要上传的头像",
        duration: 200,
      })
    const formData = new FormData()
    formData.append("photo", e.target.files[0])
    console.log(formData)

    await dispatch(updateAsyncPhoto(formData))
    onListHide()
  }
  const onUpdateBirthday = (value: Date) => {
    const formatBirthday = dayjs(value).format("YYYY-MM-DD")
    onUpdateProfile("birthday", formatBirthday)
  }
  const onLogout = () => {
    Dialog.show({
      title: "温馨提示",
      content: "是否退出登陆",
      closeOnAction: true,
      closeOnMaskClick: true,
      actions: [
        [
          { key: "cancel", text: "取消", style: { color: "#999" } },
          {
            key: "confirm",
            text: "确认",
            onClick: async () => {
              await dispatch(logoutAsyncAction())
              navigate('/login',{replace: true})
            },
          },
        ],
      ],
    })
  }

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
              onClick={() => onListShow("photo")}
              arrow
            >
              头像
            </List.Item>
            <List.Item
              arrow
              extra={name}
              onClick={() => onShowPopup("name", name)}
            >
              昵称
            </List.Item>
            <List.Item
              arrow
              extra={<span>{intro || "未填写"}</span>}
              onClick={() => onShowPopup("intro", intro || "未填写")}
            >
              简介
            </List.Item>
          </List>

          <List className="profile-list">
            <List.Item
              arrow
              extra={gender + "" === "0" ? "男" : "女"}
              onClick={() => onListShow("gender")}
            >
              性别
            </List.Item>
            <List.Item
              arrow
              extra={birthday}
              onClick={() => setShowBirthday(true)}
            >
              生日
            </List.Item>
          </List>

          <DatePicker
            visible={showBirthday}
            value={new Date(birthday)}
            title="选择年月日"
            min={new Date(1900, 0, 1, 0, 0, 0)}
            max={new Date()}
            onClose={() => setShowBirthday(false)}
            onConfirm={onUpdateBirthday}
          />

          {/* 创建 input[type=file] 标签 */}
          <input
            type="file"
            style={{ display: "none" }}
            ref={fileRef}
            onChange={onChangePhoto}
          />
        </div>

        <div className="logout">
          <Button className="btn" onClick={onLogout}>
            退出登录
          </Button>
        </div>
      </div>

      {/* 修改昵称的弹窗层 */}

      <Popup visible={inputPopup.visible} position="right" destroyOnClose>
        <EditInput
          onClose={() => onClosePopup()}
          type={inputPopup.type}
          value={inputPopup.value}
          onUpdateProfile={onUpdateProfile}
        />
      </Popup>
      <Popup visible={listPopup.visible} onMaskClick={onListHide}>
        <EditList
          onClose={onListHide}
          type={listPopup.type}
          onUpdateProfile={onUpdateProfile}
        />
      </Popup>
    </div>
  )
}
export default ProfileEdit

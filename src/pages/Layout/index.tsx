import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { Badge, TabBar } from "antd-mobile"
import styles from "./index.module.scss"
import { Icon } from "@/components/Icon"
const tabs = [
  { path: "/home/index", icon: "iconbtn_home", text: "首页" },
  { path: "/home/qs", icon: "iconbtn_qa", text: "问答" },
  { path: "/home/video", icon: "iconbtn_video", text: "视频" },
  { path: "/home/profile", icon: "iconbtn_mine", text: "我的" },
]
const Layout: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const changeRoute = (key: string) => {
    navigate(key)
  }
  return (
    <div className={styles.root}>
      <Outlet />
      <TabBar
        className="tab-bar"
        onChange={changeRoute}
        activeKey={location.pathname}
      >
        {tabs.map((item) => (
          <TabBar.Item
            key={item.path}
            title={item.text}
            icon={(active: boolean) => (
              <Icon type={active ? `${item.icon}_sel` : item.icon} />
            )}
          />
        ))}
      </TabBar>
    </div>
  )
}
export default Layout

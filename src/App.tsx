import { SpinLoading } from "antd-mobile"
import React from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import "./App.scss"
import  AuthRoute  from "./components/AuthRoute"
import { MyBrowserRouter } from "./utils/history"
const Layout = React.lazy(() => import("@/pages/Layout"))
const Login = React.lazy(() => import("@/pages/Login"))
const Home = React.lazy(() => import("@/pages/Home"))
const Question = React.lazy(() => import("@/pages/Question"))
const Video = React.lazy(() => import("@/pages/Video"))
const Profile = React.lazy(() => import("@/pages/Profile"))
const ProfileEdit = React.lazy(() => import("@/pages/Profile/Edit"))
const Article = React.lazy(() => import("@/pages/Article"))
const Search = React.lazy(() => import("@/pages/Search"))
const SearchResult = React.lazy(() => import("@/pages/Search/Result"))
const Chat = React.lazy(() => import("@/pages/Chat"))



const App: React.FC = () => {
  return (
    <MyBrowserRouter>
      <React.Suspense
        fallback={
          <SpinLoading className="suspense-spin" style={{ "--size": "48px" }} />
        }
      >
        <div className="app">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Layout />}>
              <Route path="" element={<Home />} />
              <Route path="qs" element={<Question />} />
              <Route path="video" element={<Video />} />
              <Route path="profile" element={<AuthRoute><Profile /></AuthRoute>} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/profile/edit" element={<AuthRoute><ProfileEdit /></AuthRoute>} />
            <Route path="/articles/:id" element={<AuthRoute><Article /></AuthRoute>} />
            <Route path="/search" element={<AuthRoute><Search /></AuthRoute>} />
            <Route path="/search/result" element={<AuthRoute><SearchResult /></AuthRoute>} />
            <Route path="chat" element={<AuthRoute><Chat /></AuthRoute>} />
            <Route />
          </Routes>
        </div>
      </React.Suspense>
    </MyBrowserRouter>
  )
}
export default App

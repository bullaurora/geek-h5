import { SpinLoading } from "antd-mobile"
import React from "react"
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom"
import "./App.scss"
const Home = React.lazy(() => import("@/pages/Layout"))
const Login = React.lazy(() => import("@/pages/Login"))
const App: React.FC = () => {
  return (
    <Router>
      <React.Suspense fallback={ <SpinLoading className="suspense-spin" style={{ '--size': '48px' }} />}>
        <div className="app app1">
          123123
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/home" element={<Login />} />
            <Route />
          </Routes>
        </div>
      </React.Suspense>
    </Router>
  )
}
export default App

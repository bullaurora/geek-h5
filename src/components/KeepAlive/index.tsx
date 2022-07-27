import { Route, RouteProps } from 'react-router-dom'

// 使用方式：
//  <KeepAlive path="/home"> <Home /> </KeepAlive>
export const KeepAlive = ({ children, ...rest }: RouteProps) => {
  return (
    <Route
      {...rest}
      children={props => {
        // console.log('Route 的 children 属性 代码执行了', props)
        // 如果当前路由被匹配，就展示组件内容；如果不匹配，那就隐藏组件内容
        const isMatch = props.match !== null

        return (
          <div
            style={{
              height: '100%',
              display: isMatch ? 'block' : 'none'
            }}
          >
            {children}
          </div>
        )
      }}
    />
  )
}

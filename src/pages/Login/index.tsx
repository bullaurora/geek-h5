import { loginAsyncAction, getCodeAsyncAction } from "@/store/actions/login"
import useMyDispatch from "@/store/useMyDispatch"
import { Button, NavBar, Form, Input, Toast } from "antd-mobile"
import { InputRef } from "antd-mobile/es/components/input"
import { AxiosError } from "axios"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import styles from "./index.module.scss"
export interface LoginForm {
  mobile: string
  code: string
}
const Login: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(0)
  const mobileRef = useRef<InputRef>(null)
  const timeRef = useRef(-1)
  const dispatch = useMyDispatch()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  //倒计时状态
  const onFinish = async (values: LoginForm) => {
    try {
      await dispatch(loginAsyncAction(values))
      Toast.show({
        content: "登陆成功",
        duration: 50,
        afterClose: () => {
          navigate("/home", { replace: true })
        },
      })
    } catch (e) {
      const error = e as AxiosError<{ message: string }>
      Toast.show({
        content: error.response?.data.message,
        duration: 1000,
      })
    }
  }
  const onGetCode = () => {
    const mobile = (form.getFieldValue("mobile") ?? "") as string
    const hasError = form.getFieldError("mobile").length > 0
    if (mobile.trim() === "" || hasError) {
      return mobileRef.current?.focus()
    }
    //验证成功获得成功验证码
    dispatch(getCodeAsyncAction(mobile))
    setTimeLeft(60)
    timeRef.current = window.setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1)
    }, 1000)
  }
  useEffect(() => {
    if (timeLeft === 0) {
      window.clearInterval(timeRef.current)
    }
  }, [timeLeft])
  useEffect(() => {
    return () => window.clearInterval(timeRef.current)
  }, [])
  return (
    <div className={styles.root}>
      <NavBar onBack={() => navigate(-1)}></NavBar>

      <div className="login-form">
        <h2 className="title">账号登录</h2>

        <Form
          form={form}
          validateTrigger={["onBlur", "onChange"]}
          onFinish={onFinish}
          initialValues={{ mobile: "13911112222",code:'246810'}}
        >
          <Form.Item
            className="login-item"
            name="mobile"
            rules={[
              { required: true, message: "请输入手机号" },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "手机号格式错误",
              },
            ]}
            validateTrigger="onBlur"
          >
            <Input placeholder="请输入手机号" maxLength={11} ref={mobileRef} />
          </Form.Item>

          <Form.Item
            className="login-item"
            extra={
              <span
                className="code-extra"
                onClick={timeLeft === 0 ? onGetCode : undefined}
              >
                {timeLeft === 0 ? "发送验证码" : `${timeLeft}s后重新获取`}
              </span>
            }
            name="code"
            rules={[
              { required: true, message: "请输入验证码" },
              {
                pattern: /^\d{6}$/,
                message: "验证码格式错误",
              },
            ]}
            validateTrigger="onBlur"
          >
            <Input
              placeholder="请输入验证码"
              autoComplete="off"
              maxLength={6}
            />
          </Form.Item>

          {/* noStyle 表示不提供 Form.Item 自带的样式 */}
          <Form.Item noStyle shouldUpdate>
            {() => {
              const disabled =
                form.getFieldsError().filter((item) => item.errors.length)
                  .length > 0 || !form.isFieldsTouched(true)
              return (
                <Button
                  disabled={disabled}
                  block
                  type="submit"
                  color="primary"
                  className="login-submit"
                >
                  登 录
                </Button>
              )
            }}
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login

import { FunctionComponent as FC } from 'react';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import LogoPng from '@assets/image/logo.png';
import backImg from '@assets/image/back_img.png';
import useLogin from './useLogin';
import './_style.scss';
import LanguageSellect from '@/component/LanguageSelect';

const Login: FC<any> = () => {
  const { langs, loading, success, onFinish, onFinishFailed, forgetPassword } =
    useLogin();
  return (
    <div className="login-wapper">
      <div className="login-language-wapper">
        <LanguageSellect />
      </div>
      <div className="login-background">
        <div className="login-div">
          <div className="welcome-wapper">
            <h1 className="welcome-title">{langs?.welcome}</h1>
            <img src={backImg} alt="" className="back-img-wapper" />
          </div>
          <div className="login-form">
            <div className="logo">
              <div className="logo-img">
                <img src={LogoPng} alt="" />
              </div>
            </div>
            <div className="login-text">
              <Form
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                labelWrap
                initialValues={{ userName: 'admin', password: '' }}
              >
                <Form.Item
                  name="userName"
                  rules={[
                    { required: true, message: langs.comPleaseEnterUsername }
                  ]}
                >
                  <Input
                    size="large"
                    style={{ borderRadius: '10px', width: '100%' }}
                    placeholder={langs.comUsername}
                    prefix={
                      <UserOutlined
                        style={{ color: 'rgba(36, 147, 246,.6)' }}
                      />
                    }
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: langs.comPleaseEnterPassword }
                  ]}
                  style={{ marginBottom: 0 }}
                >
                  <Input.Password
                    size="large"
                    style={{ borderRadius: '10px', width: '100%' }}
                    placeholder={langs.comPassword}
                    prefix={
                      <LockOutlined
                        style={{ color: 'rgba(36, 147, 246,.6)' }}
                      />
                    }
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="link"
                    style={{
                      float: 'right'
                    }}
                    onClick={forgetPassword}
                  >
                    {langs.comForgetsecret}
                  </Button>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    style={{ borderRadius: '10px', width: '100%' }}
                    block
                    loading={loading}
                  >
                    {!success ? langs.comLogin : langs.comLoginSuccess}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

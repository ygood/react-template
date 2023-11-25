import { message, Modal } from 'antd';
import { useContext, useState } from 'react';
import { loginUrl } from '@/constants/url';
import { languageContext } from '@/context';
import { sha256Encryption } from '@/utils/common';
import { HttpStatus } from '@/entity/Enum';
import http from '@/http/http';

interface PostUser {
  userName: string;
  password: string;
}
const useLogin = () => {
  const { langs } = useContext(languageContext);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  //第一次挑战时，客户端返回207需要当作正常请求处理，无法使用postData函数, 所以登录接口特殊处理，写了这个postLogin接口，
  const postLogin = async (...[endpoint, config]: Parameters<typeof http>) => {
    try {
      const { errCode, data } = await http(endpoint, {
        ...config,
        method: 'POST'
      });
      if (
        errCode === HttpStatus.OK ||
        errCode === HttpStatus.err207 ||
        errCode === HttpStatus.err215
      ) {
        return Promise.resolve({ errCode, data });
      } else {
        return Promise.reject(errCode);
      }
    } catch (error: any) {
      return Promise.reject(error);
    }
  };

  const onFinish = async (values: any) => {
    const user: PostUser = { userName: 'admin', password: '' };
    setLoading(true);
    try {
      const { errCode: code, data: result } = await postLogin(loginUrl, {
        data: user
      });
      if (code === HttpStatus.err207) {
        const hashDigest = sha256Encryption(values.password, result.challenge);
        user.password = hashDigest;
        const { errCode: code2 } = await postLogin(loginUrl, {
          data: user
        });
        if (code2 === HttpStatus.OK) {
          setSuccess(true);
          setTimeout(() => {
            window.location.href = '/';
          }, 300);
        } else {
          message.error(langs[`errCodeMessage${code2}`]);
        }
      } else {
        message.error(langs[`errCodeMessage${code}`]);
      }
    } catch (error) {
      message.error(langs.comLoginFailTip);
    } finally {
      setLoading(false);
    }
  };
  const forgetPassword = () => {
    Modal.warning({
      title: langs.comForgetsecret,
      content: (
        <div>
          <p>{langs.resetPasswordInfo}</p>
        </div>
      ),
      onOk() {}
    });
  };
  const onFinishFailed = (errorInfo: any) => {
    message.error(errorInfo.errorFields[0].errors[0]);
  };
  return {
    langs,
    loading,
    success,
    onFinish,
    onFinishFailed,
    forgetPassword
  };
};

export default useLogin;

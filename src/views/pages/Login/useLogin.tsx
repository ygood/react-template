import { message, Modal } from 'antd';
import { useContext, useState } from 'react';
import { loginUrl } from '@/constants/url';
import { languageContext } from '@/context';
import { sha256Encryption } from '@/utils/common';
import { HttpStatus } from '@/entity/Enum';
import postData from '@/http/postRequest';
import { setLoginStatus } from '@/utils/sessionStorageUtil';

interface PostUser {
  userName: string;
  password: string;
}
const useLogin = () => {
  const { langs } = useContext(languageContext);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const hashDigest = sha256Encryption(values.password, 'zxczxczxczxc');
      const user: PostUser = {
        userName: values.userName,
        password: hashDigest
      };
      const { errCode } = await postData(loginUrl, {
        data: user
      });
      if (errCode === HttpStatus.OK) {
        setSuccess(true);
        setLoginStatus('true');
        setTimeout(() => {
          window.location.href = '/';
        }, 300);
      } else {
        message.error(langs[`errCodeMessage${errCode}`]);
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

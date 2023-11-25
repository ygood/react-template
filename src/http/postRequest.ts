import { message } from 'antd';
import { ErrCode } from '@/entity/Enum';
import { sleep } from '@/utils/common';
import http from './http';

const postData = async (...[endpoint, config]: Parameters<typeof http>) => {
  try {
    const skipLoading = config?.skipLoading;
    const { errCode, data } = await http(endpoint, {
      ...config,
      method: 'POST'
    });
    if (!(errCode === ErrCode.OK || errCode === ErrCode.CHALLENGE)) {
      const key = `errCodeMessage${errCode}`;
      message.error(key);
      return Promise.reject(errCode);
    }
    if (!skipLoading && data) {
      data.loadingTime && (await sleep(data.loadingTime * 1000));
    }
    return Promise.resolve({ errCode, data });
  } catch (error: any) {
    console.log(error);
    return Promise.reject(error);
  }
};
export default postData;

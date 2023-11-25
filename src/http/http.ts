import axios from './axios';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { setLoginStatus } from '@/utils/sessionStorageUtil';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipLoading?: boolean;
}

const http = async (
  endpoint: string,
  { data = {}, method = 'GET', ...customConfig }: CustomAxiosRequestConfig = {}
) => {
  let params: object | null = null;
  if (method === 'GET') {
    data.IEtimeStamp = new Date().getTime();
  }
  if (method === 'GET' && Object.keys(data).length > 0) {
    params = data;
  }
  try {
    const config = {
      method,
      url: endpoint,
      data: data instanceof FormData ? data : { data },
      params,
      ...customConfig
    };
    const response = await axios(config);
    if (
      response.headers['content-type'].indexOf('application/octet-stream') > -1
    ) {
      return Promise.resolve(response);
    }
    return Promise.resolve(response.data);
  } catch (error) {
    const _err = error as AxiosError;
    if (_err?.response?.status === 401) {
      setLoginStatus('false');
      window.location.reload();
      return Promise.reject(new Error('401,请重新登录'));
    }
  }
};

export const useHttp = () => {
  return (...[endpoint, config]: Parameters<typeof http>) => {
    return http(endpoint, { ...config });
  };
};

export const useHttpPost = () => {
  return (...[endpoint, config]: Parameters<typeof http>) => {
    return http(endpoint, { ...config, method: 'POST' });
  };
};

export const DownloadCfg = (param?: Partial<any>) => {
  const client = useHttp();
  return client('api/system/downloadCfg', {
    data: param || {},
    responseType: 'arraybuffer'
  });
};

export default http;

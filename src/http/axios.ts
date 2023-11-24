import Axios from 'axios';

let apiUrl = import.meta.env.VITE_APP_PROXY_URL as string;

if (!apiUrl?.endsWith('/')) {
  apiUrl += '/';
}

const axios = Axios.create({
  baseURL: apiUrl,
  timeout: 20000,
  headers: { 'Content-Type': 'application/json' }
});

// 添加请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response;
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default axios;

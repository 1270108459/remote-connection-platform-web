import { extend } from 'umi-request';

// 创建 request 实例
const umiRequest = extend({
  prefix: '/api', // 可选
  timeout: 10000,
  errorHandler: (error) => {
    console.error(error);
    return error;
  },
});

// 封装和你原来一样的风格
const request = (url: string, options?: any) => umiRequest(url, options);

request.get = (url: string, options?: any) => umiRequest(url, { ...options, method: 'GET' });
request.post = (url: string, options?: any) => umiRequest(url, { ...options, method: 'POST' });
request.put = (url: string, options?: any) => umiRequest(url, { ...options, method: 'PUT' });
request.delete = (url: string, options?: any) => umiRequest(url, { ...options, method: 'DELETE' });

export default request;

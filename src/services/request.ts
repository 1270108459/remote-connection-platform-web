import { extend } from 'umi-request';

// 创建 request 实例
// 在 src/services/request.ts 中统一处理响应
const umiRequest = extend({
    prefix: '/api',
    timeout: 10000,
    errorHandler: (error) => {
      console.error(error);
      return error;
    },
    // 新增响应拦截器，提取 data 字段
    responseInterceptors: [
      (response) => {
        const { data } = response;
        // 假设成功响应格式为 { code: 0, data: [...] }
        if (data?.code === 0) {
          return data.data; // 只返回 data 字段
        }
        return []; // 失败时返回空数组
      },
    ],
  });

// 封装和你原来一样的风格
const request = (url: string, options?: any) => umiRequest(url, options);

request.get = (url: string, options?: any) => umiRequest(url, { ...options, method: 'GET' });
request.post = (url: string, options?: any) => umiRequest(url, { ...options, method: 'POST' });
request.put = (url: string, options?: any) => umiRequest(url, { ...options, method: 'PUT' });
request.delete = (url: string, options?: any) => umiRequest(url, { ...options, method: 'DELETE' });

export default request;

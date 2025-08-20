import { v4 as uuidv4 } from 'uuid';

let assets = [
  { id: '1', customer: '客户A', project: '项目A', server: '服务器1', network: '网络1', platform: '平台1' },
  { id: '2', customer: '客户B', project: '项目B', server: '服务器2', network: '网络2', platform: '平台2' },
];

export default [
  { url: '/api/assets', method: 'get', response: () => ({ code: 0, data: assets }) },
  { url: '/api/assets', method: 'post', response: ({ body }) => {
      const newAsset = { ...body, id: uuidv4() };
      assets.push(newAsset);
      return { code: 0, data: newAsset };
    }
  },
  { url: '/api/assets/:id', method: 'put', response: ({ body, params }) => {
      assets = assets.map(a => a.id === params.id ? { ...a, ...body } : a);
      return { code: 0, data: body };
    }
  },
  { url: '/api/assets/:id', method: 'delete', response: ({ params }) => {
      assets = assets.filter(a => a.id !== params.id);
      return { code: 0 };
    }
  },
];

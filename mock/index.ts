import site from './site';
import customer from './customer';
import asset from './assets';

export default {
  ...site,
  ...customer,
  ...asset,
  // 可以在这里添加全局通用的mock配置
  'GET /api/health': () => ({
    code: 0,
    data: 'ok',
    message: '服务正常'
  })
};

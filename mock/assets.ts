import { v4 as uuidv4 } from 'uuid';

// 模拟资产数据
let assets = [
  {
    id: '1',
    customerId: '1',
    customerName: '云启科技', // 冗余客户名称
    project: '核心业务系统',
    server: 'IBM Power 9',
    network: '万兆光纤',
    platform: 'Linux CentOS 7',
  },
  {
    id: '2',
    customerId: '2',
    customerName: '数智未来',
    project: '大数据分析平台',
    server: '戴尔 R740',
    network: '千兆以太网',
    platform: 'Linux Ubuntu 20.04',
  },
];

// 对象格式导出
export default {
  'GET /api/assets': () => ({
    code: 0,
    data: assets,
    message: 'success',
  }),

  'POST /api/assets': ({ body }) => {
    // 从customers中匹配客户名称
    const customer = customers.find(c => c.id === body.customerId);
    const newAsset = {
      ...body,
      id: uuidv4(),
      customerName: customer?.name || '', // 冗余客户名称
    };
    assets.push(newAsset);
    return {
      code: 0,
      data: newAsset,
      message: '创建成功',
    };
  },

  'PUT /api/assets/:id': ({ body, params }) => {
    const targetIndex = assets.findIndex(a => a.id === params.id);
    if (targetIndex === -1) {
      return { code: 1, message: '资产不存在' };
    }
    // 更新时同步客户名称
    if (body.customerId) {
      const customer = customers.find(c => c.id === body.customerId);
      body.customerName = customer?.name || '';
    }
    assets[targetIndex] = { ...assets[targetIndex], ...body };
    return {
      code: 0,
      data: assets[targetIndex],
      message: '更新成功',
    };
  },

  'DELETE /api/assets/:id': ({ params }) => {
    const initialLength = assets.length;
    assets = assets.filter(a => a.id !== params.id);
    if (assets.length === initialLength) {
      return { code: 1, message: '资产不存在' };
    }
    return { code: 0, message: '删除成功' };
  },
};
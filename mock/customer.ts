import { v4 as uuidv4 } from 'uuid';

// 模拟客户数据
let customers = [
  {
    id: '1',
    name: '云启科技',
    address: '上海市浦东新区张江科技园',
    siteId: '1', // 关联场地ID（对应sites中的id）
    siteName: '总部数据中心', // 冗余场地名称
    manager: '张明',
    pdd: '李华',
    inWarranty: true,
  },
  {
    id: '2',
    name: '数智未来',
    address: '杭州市西湖区科技园',
    siteId: '2',
    siteName: '华东区域机房',
    manager: '王芳',
    pdd: '赵杰',
    inWarranty: false,
  },
];

// 对象格式导出
export default {
  'GET /api/customers': () => ({
    code: 0,
    data: customers,
    message: 'success',
  }),

  'POST /api/customers': ({ body }) => {
    // 从sites中匹配场地名称（模拟关联查询）
    const site = sites.find(s => s.id === body.siteId);
    const newCustomer = {
      ...body,
      id: uuidv4(),
      siteName: site?.name || '', // 冗余场地名称
    };
    customers.push(newCustomer);
    return {
      code: 0,
      data: newCustomer,
      message: '创建成功',
    };
  },

  'PUT /api/customers/:id': ({ body, params }) => {
    const targetIndex = customers.findIndex(c => c.id === params.id);
    if (targetIndex === -1) {
      return { code: 1, message: '客户不存在' };
    }
    // 更新时同步更新场地名称
    if (body.siteId) {
      const site = sites.find(s => s.id === body.siteId);
      body.siteName = site?.name || '';
    }
    customers[targetIndex] = { ...customers[targetIndex], ...body };
    return {
      code: 0,
      data: customers[targetIndex],
      message: '更新成功',
    };
  },

  'DELETE /api/customers/:id': ({ params }) => {
    const initialLength = customers.length;
    customers = customers.filter(c => c.id !== params.id);
    if (customers.length === initialLength) {
      return { code: 1, message: '客户不存在' };
    }
    return { code: 0, message: '删除成功' };
  },
};
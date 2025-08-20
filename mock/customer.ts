import { v4 as uuidv4 } from 'uuid';

let customers = [
  { id: '1', name: '客户A', address: '地址A', siteType: '场地A', manager: '张三', pdd: '李四', inWarranty: true },
  { id: '2', name: '客户B', address: '地址B', siteType: '场地B', manager: '王五', pdd: '赵六', inWarranty: false },
];

export default [
  { url: '/api/customers', method: 'get', response: () => ({ code: 0, data: customers }) },
  { url: '/api/customers', method: 'post', response: ({ body }) => {
      const newCustomer = { ...body, id: uuidv4() };
      customers.push(newCustomer);
      return { code: 0, data: newCustomer };
    }
  },
  { url: '/api/customers/:id', method: 'put', response: ({ body, params }) => {
      customers = customers.map(c => c.id === params.id ? { ...c, ...body } : c);
      return { code: 0, data: body };
    }
  },
  { url: '/api/customers/:id', method: 'delete', response: ({ params }) => {
      customers = customers.filter(c => c.id !== params.id);
      return { code: 0 };
    }
  },
];

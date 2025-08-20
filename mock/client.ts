export default {
    'GET /api/clients': (req: any, res: any) => {
      res.json([
        { key: '1', name: '客户A', contact: '张三', phone: '13812345678' },
        { key: '2', name: '客户B', contact: '李四', phone: '13987654321' },
      ]);
    },
  };
  
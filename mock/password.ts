let passwords = [
    { key: '1', type: 'MySQL', account: 'root', password: '******' },
    { key: '2', type: 'Worker', account: 'admin', password: '******' },
  ];
  
  export default {
    // 查询
    'GET /api/passwords': (req: any, res: any) => {
      res.json(passwords);
    },
    // 新增
    'POST /api/passwords': (req: any, res: any) => {
      const { type, account, password } = req.body;
      const newItem = { key: Date.now().toString(), type, account, password };
      passwords.push(newItem);
      res.json({ success: true, data: newItem });
    },
    // 编辑
    'PUT /api/passwords/:key': (req: any, res: any) => {
      const { key } = req.params;
      const { type, account, password } = req.body;
      passwords = passwords.map((item) =>
        item.key === key ? { ...item, type, account, password } : item
      );
      res.json({ success: true });
    },
    // 删除
    'DELETE /api/passwords/:key': (req: any, res: any) => {
      const { key } = req.params;
      passwords = passwords.filter((item) => item.key !== key);
      res.json({ success: true });
    },
  };
  
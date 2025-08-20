let fields = [
    {
      key: '1',
      name: '测试场地1',
      type: 'upacs',
      servers: [
        { key: 's1', type: 'MySQL', host: 'mysql.example.com' },
        { key: 's2', type: 'Master', host: 'master.example.com' },
      ],
    },
    {
      key: '2',
      name: '测试场地2',
      type: '全家桶',
      servers: [],
    },
  ];
  
  export default {
    // 获取场地列表
    'GET /api/fields': (req: any, res: any) => {
      res.json(fields);
    },
  
    // 新增场地
    'POST /api/fields': (req: any, res: any) => {
      const { name, type } = req.body;
      const newField = { key: Date.now().toString(), name, type, servers: [] };
      fields.push(newField);
      res.json({ success: true, data: newField });
    },
  
    // 编辑场地
    'PUT /api/fields/:key': (req: any, res: any) => {
      const { key } = req.params;
      const { name, type } = req.body;
      fields = fields.map(f => f.key === key ? { ...f, name, type } : f);
      res.json({ success: true });
    },
  
    // 删除场地
    'DELETE /api/fields/:key': (req: any, res: any) => {
      const { key } = req.params;
      fields = fields.filter(f => f.key !== key);
      res.json({ success: true });
    },
  
    // 新增服务器
    'POST /api/fields/:key/servers': (req: any, res: any) => {
      const { key } = req.params;
      const { type, host } = req.body;
      const server = { key: Date.now().toString(), type, host };
      fields = fields.map(f =>
        f.key === key ? { ...f, servers: [...f.servers, server] } : f,
      );
      res.json({ success: true, data: server });
    },
  
    // 编辑服务器
    'PUT /api/fields/:fieldKey/servers/:serverKey': (req: any, res: any) => {
      const { fieldKey, serverKey } = req.params;
      const { type, host } = req.body;
      fields = fields.map(f =>
        f.key === fieldKey
          ? {
              ...f,
              servers: f.servers.map(s =>
                s.key === serverKey ? { ...s, type, host } : s,
              ),
            }
          : f,
      );
      res.json({ success: true });
    },
  
    // 删除服务器
    'DELETE /api/fields/:fieldKey/servers/:serverKey': (req: any, res: any) => {
      const { fieldKey, serverKey } = req.params;
      fields = fields.map(f =>
        f.key === fieldKey
          ? { ...f, servers: f.servers.filter(s => s.key !== serverKey) }
          : f,
      );
      res.json({ success: true });
    },
  };
  
let remoteConnections = [
    { key: '1', url: 'http://mysql.example.com', password: '******' },
    { key: '2', url: 'http://worker.example.com', password: '******' },
  ];
  
  export default {
    // 查询
    'GET /api/remote-connections': (req: any, res: any) => {
      res.json(remoteConnections);
    },
    // 新增
    'POST /api/remote-connections': (req: any, res: any) => {
      const { url, password } = req.body;
      const newItem = { key: Date.now().toString(), url, password };
      remoteConnections.push(newItem);
      res.json({ success: true, data: newItem });
    },
    // 编辑
    'PUT /api/remote-connections/:key': (req: any, res: any) => {
      const { key } = req.params;
      const { url, password } = req.body;
      remoteConnections = remoteConnections.map((item) =>
        item.key === key ? { ...item, url, password } : item
      );
      res.json({ success: true });
    },
    // 删除
    'DELETE /api/remote-connections/:key': (req: any, res: any) => {
      const { key } = req.params;
      remoteConnections = remoteConnections.filter((item) => item.key !== key);
      res.json({ success: true });
    },
  };
  
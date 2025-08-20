let resources = [
    { key: '1', serverType: 'MySQL', password: '******', file: '拓扑图1.png' },
    { key: '2', serverType: 'Worker', password: '******', file: '拓扑图2.png' },
  ];
  
  export default {
    'GET /api/resources': (req: any, res: any) => {
      res.json(resources);
    },
    'POST /api/resources': (req: any, res: any) => {
      const { serverType, password, file } = req.body;
      const newItem = { key: Date.now().toString(), serverType, password, file };
      resources.push(newItem);
      res.json({ success: true, data: newItem });
    },
    'PUT /api/resources/:key': (req: any, res: any) => {
      const { key } = req.params;
      const { serverType, password, file } = req.body;
      resources = resources.map((item) =>
        item.key === key ? { ...item, serverType, password, file } : item
      );
      res.json({ success: true });
    },
    'DELETE /api/resources/:key': (req: any, res: any) => {
      const { key } = req.params;
      resources = resources.filter((item) => item.key !== key);
      res.json({ success: true });
    },
  };
  
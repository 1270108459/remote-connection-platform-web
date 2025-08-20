// mock/projects.ts
import { Request, Response } from 'express';

let projects = [
  { id: 1, customerId: 1, manager: '张三', pddContact: '李四', inWarranty: true },
  { id: 2, customerId: 1, manager: '王五', pddContact: '赵六', inWarranty: false },
];

export default {
  'GET /api/projects': (req: Request, res: Response) => {
    res.json(projects);
  },

  'POST /api/projects': (req: Request, res: Response) => {
    const { customerId, manager, pddContact, inWarranty } = req.body;
    const newProject = {
      id: Date.now(),
      customerId,
      manager,
      pddContact,
      inWarranty,
    };
    projects.push(newProject);
    res.json(newProject);
  },

  'PUT /api/projects/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    const index = projects.findIndex((p) => p.id == Number(id));
    if (index > -1) {
      projects[index] = { ...projects[index], ...req.body };
      res.json(projects[index]);
    } else {
      res.status(404).json({ error: '项目不存在' });
    }
  },

  'DELETE /api/projects/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    projects = projects.filter((p) => p.id != Number(id));
    res.json({ success: true });
  },
};

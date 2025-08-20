import { v4 as uuidv4 } from 'uuid';

let sites = [
  { id: '1', name: '场地A', createdAt: '2025-08-20' },
  { id: '2', name: '场地B', createdAt: '2025-08-21' },
];

export default [
  { url: '/api/sites', method: 'get', response: () => ({ code: 0, data: sites }) },
  { url: '/api/sites', method: 'post', response: ({ body }) => {
      const newSite = { ...body, id: uuidv4(), createdAt: new Date().toISOString().split('T')[0] };
      sites.push(newSite);
      return { code: 0, data: newSite };
    }
  },
  { url: '/api/sites/:id', method: 'put', response: ({ body, params }) => {
      sites = sites.map(s => s.id === params.id ? { ...s, ...body } : s);
      return { code: 0, data: body };
    }
  },
  { url: '/api/sites/:id', method: 'delete', response: ({ params }) => {
      sites = sites.filter(s => s.id !== params.id);
      return { code: 0 };
    }
  },
];

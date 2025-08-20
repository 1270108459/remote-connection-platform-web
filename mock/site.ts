import { v4 as uuidv4 } from 'uuid';

// 模拟场地数据
let sites = [
  { id: '1', name: '总部数据中心', createdAt: '2025-01-15' },
  { id: '2', name: '华东区域机房', createdAt: '2025-02-20' },
  { id: '3', name: '华南边缘节点', createdAt: '2025-03-10' },
];

// 对象格式导出（键为 "METHOD URL"）
export default {
  'GET /api/sites': () => ({
    code: 0,
    data: sites,
    message: 'success',
  }),

  'POST /api/sites': ({ body }) => {
    const newSite = {
      ...body,
      id: uuidv4(),
      createdAt: new Date().toISOString().split('T')[0], // 自动生成创建时间
    };
    sites.push(newSite);
    return {
      code: 0,
      data: newSite,
      message: '创建成功',
    };
  },

  'PUT /api/sites/:id': ({ body, params }) => {
    const targetIndex = sites.findIndex(s => s.id === params.id);
    if (targetIndex === -1) {
      return { code: 1, message: '场地不存在' };
    }
    sites[targetIndex] = { ...sites[targetIndex], ...body };
    return {
      code: 0,
      data: sites[targetIndex],
      message: '更新成功',
    };
  },

  'DELETE /api/sites/:id': ({ params }) => {
    const initialLength = sites.length;
    sites = sites.filter(s => s.id !== params.id);
    if (sites.length === initialLength) {
      return { code: 1, message: '场地不存在' };
    }
    return { code: 0, message: '删除成功' };
  },
};
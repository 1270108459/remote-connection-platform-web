import { defineConfig } from '@umijs/max';

export default defineConfig({
  layout: {
    title: '远程管理平台',
    menu: {
      locale: true, // 开启内置菜单
    },
  },
  routes: [
    {
      path: '/',
      redirect: '/home', // 根路径重定向到首页
    },
    {
      name: '首页',
      path: '/home',
      component: '@/pages/index', // 页面组件，大小写对应实际文件
    },
    {
      name: '场地类型',
      path: '/site-types',
      component: '@/pages/SiteTypes', // 注意与文件夹名一致
    },
    {
      name: '客户信息',
      path: '/customers',
      component: '@/pages/Customers', // 与文件夹名一致
    },
    {
      name: '资产管理',
      path: '/assets',
      component: '@/pages/Assets', // 与文件夹名一致
    },
  ],
});

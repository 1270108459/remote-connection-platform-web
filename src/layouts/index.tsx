import React from 'react';
import { Layout, Typography } from 'antd';
import { Outlet, useLocation } from 'umi';
import './index.less';

const { Header, Content } = Layout;
const { Title } = Typography;

const BasicLayout: React.FC = (props: any) => {
  const location = useLocation();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 顶部标题 */}
      <Header style={{ background: '#fff', padding: '0 16px' }}>
        <Title level={4} style={{ margin: 0, lineHeight: '64px' }}>
          远程管理平台
        </Title>
      </Header>

      {/* 内容区 */}
      <Layout>
        {/* 内置菜单已经渲染在 Sider，这里只渲染 Outlet */}
        <Content style={{ margin: '16px', background: '#fff', padding: '16px' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;

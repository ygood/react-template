import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import LayoutSide from './LayoutSide';
import LayoutHeader from './LayoutHeader';
import './_style.scss';
const { Content } = Layout;

const LayoutComponent = () => {
  return (
    <Layout className="layout-wapper">
      <LayoutHeader />
      <Layout>
        <LayoutSide />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content className="content-container">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;

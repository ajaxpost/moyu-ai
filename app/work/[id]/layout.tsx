'use client';
import HeaderComponent from '@/components/header';
import SiderComponent from '@/components/work/sider';
import { Layout } from '@douyinfe/semi-ui';
import SplitPane from 'react-split-pane';
import './index.css';

const { Content } = Layout;

export default function LayoutComponent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <SplitPane
        split="vertical"
        minSize={200}
        maxSize={500}
        defaultSize={300}
        primary="first"
      >
        <SiderComponent />
        <Layout className="h-full">
          <HeaderComponent
            style={{
              height: 44,
              lineHeight: '44px',
              border: 0,
              padding: '8px 12px',
            }}
            showUser={false}
          />
          <Content
            style={{
              height: 'calc(100% - 44px)',
              overflow: 'auto',
            }}
          >
            {children}
          </Content>
        </Layout>
      </SplitPane>
    </Layout>
  );
}

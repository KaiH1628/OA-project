import React from 'react';
import selectLayout from 'utils/selectLayout';
import BaseLayout from './BaseLayout';
import LoginLayout from './LoginLayout';
import Loading from '../components/Loading';
import { useSelector } from 'react-redux';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

const Layout = (props) => {
  const LayoutMap = { BaseLayout, LoginLayout };
  const Container = LayoutMap[selectLayout(props.location.pathname)];
  const loading = useSelector((state) => state.loading);
  return (
    <ConfigProvider locale={zhCN}>
      <Container>
        <Loading isShow={loading.effects['user/login']} />
        {props.children}
      </Container>
    </ConfigProvider>
  );
};

export default Layout;

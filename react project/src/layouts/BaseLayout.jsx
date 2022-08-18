import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
const { Header, Sider, Content } = Layout;
import './BaseLayout.less';
import SiderBar from 'components/SiderBar';
import { history, useSelector, useDispatch } from 'umi';
import CommonHeader from 'components/CommonHeader';
import NotFound from '../pages/404Page';
import Loading from '../components/Loading';
import 'common/css/main.less';

const BaseLayout = (props) => {
  // const [collapse, setCollapse] = useState(false);
  const routeList = JSON.parse(sessionStorage.getItem('routeList'));
  // console.log(routeList);
  const loading = useSelector((state) => state.loading);
  const {collapse} = useSelector((state) => state.common);
  // console.log(loading.effects['dashboard/initDashboardList']);
  const dispatch = useDispatch();

  const isIncludePage = () => {
    if (history.location.pathname === '/') {
      history.replace(routeList[0].route);
      return false;
    } else {
      return routeList?.some((item) => item.route === history.location.pathname);
    }
  };

  const changeCollapse = () => {
    //   setCollapse(!collapse);
    dispatch({
      type: 'common/changeCollapse',
      payload: { collapse: !collapse },
    });
  };

  return (
    <>
      <Layout className="container">
        <SiderBar Sider={Sider} Menu={Menu} collapse={collapse} />
        <Layout>
          {/* <Header>Header</Header> */}
          <CommonHeader
            Header={Header}
            collapse={collapse}
            changeCollapse={changeCollapse}
          />
          <Content className="main-content">
            {isIncludePage() ? (
              <>
                <Loading
                  part={true}
                  isShow={
                    loading.effects['dashboard/initDashboardList'] ||
                    loading.effects['attendance/initAttendanceList']
                  }
                  // isShow={true}
                />
                {props.children}
              </>
            ) : (
              <NotFound />
            )}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default BaseLayout;

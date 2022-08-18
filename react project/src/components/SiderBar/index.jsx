import React from 'react';
import { history, Link } from 'umi';
import IconMap from '../IconMap';
import Logo from 'common/img/logo.svg';

const SiderBar = ({ Sider, Menu, collapse }) => {
  const pathname = history.location.pathname;
  const routeList = sessionStorage.getItem('routeList')
    ? JSON.parse(sessionStorage.getItem('routeList'))
    : [];

  return (
    <Sider theme="light" className="side-bar" collapsed={collapse}>
      <div className="brand">
        <div className="logo">
          <img src={Logo} alt="" />
          {!collapse && <h1>人事管理系统</h1>}
        </div>
      </div>
      <div className="main-container">
        <Menu mode="inline" selectedKeys={[pathname]}>
          {routeList?.map((item) => {
            return (
              <Menu.Item key={item.route}>
                <Link to={item.route}>
                  {IconMap[item.icon]}
                  <span>{item.zhName}</span>
                </Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </div>
    </Sider>
  );
};

export default SiderBar;

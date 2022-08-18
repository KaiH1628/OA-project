import React from 'react';
import { Menu, Avatar } from 'antd';
import IconMap from '../IconMap';
import { useSelector } from 'umi';
import defaultAvatarIcon from 'common/img/default_avatar.png';
import { history } from 'umi';

const CommonHeader = ({ Header, collapse, changeCollapse }) => {
  const { SubMenu, Divider, Item } = Menu;
  const { userInfo } = useSelector((state) => state.user);
  // console.log(userInfo);

  const MenuTitle = (
    <>
      <span>{userInfo.userName}</span>
      <Avatar style={{ marginLeft: 10 }} src={defaultAvatarIcon} />
    </>
  );

  const signOut = () => {
    sessionStorage.clear();
    history.push('/users/login');
  };
  return (
    <Header>
      <div className="button" onClick={changeCollapse}>
        {collapse ? IconMap.rightArrow : IconMap.leftArrow}
      </div>
      <Menu mode="horizontal">
        <SubMenu key={['1']} title={MenuTitle}>
          <Divider />
          <Item key={'2'} icon={IconMap.signOut} onClick={signOut}>
            <span>退出</span>
          </Item>
        </SubMenu>
      </Menu>
    </Header>
  );
};

export default CommonHeader;

import React from 'react';
import IconMap from 'components/IconMap';
import { loginRules } from 'utils/rules';

const AccountLogin = ({ form, FormItem, Input }) => {
  return (
    <>
      <FormItem name="accountName" rules={loginRules.userRule} hasFeedback>
        <Input placeholder="请输入用户名" prefix={IconMap.User}></Input>
      </FormItem>
      <FormItem name="password" rules={loginRules.passwordRule} hasFeedback>
        <Input
          placeholder="请输入密码"
          prefix={IconMap.PassWord}
          type="password"
        />
      </FormItem>
    </>
  );
};

export default AccountLogin;

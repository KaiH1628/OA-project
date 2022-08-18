import React from 'react';
import IconMap from 'components/IconMap';
import { loginRules } from 'utils/rules';

const UpdatePassword = ({ form, FormItem, Input }) => {
  return (
    <>
      <FormItem name="newPassword" rules={loginRules.passwordRule} hasFeedback>
        <Input
          placeholder="输入新密码"
          prefix={IconMap.PassWord}
          type="password"
        ></Input>
      </FormItem>
      <FormItem
        name="confirmNewPassword"
        rules={loginRules.confirmPasswordRule(form)}
        hasFeedback
      >
        <Input
          placeholder="确认密码"
          prefix={IconMap.PassWord}
          type="password"
        />
      </FormItem>
    </>
  );
};

export default UpdatePassword;

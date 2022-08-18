import React, { useState } from 'react';
import IconMap from 'components/IconMap';
import { Button, message } from 'antd';
import { loginRules } from 'utils/rules';
import $http from 'api';

const SmCodeLogin = ({ form, FormItem, Input }) => {
  const [disable, setDisable] = useState(true);
  const [currentStatus, setCurrentStatus] = useState(true);
  let [time, setTime] = useState(60);

  const _sendSubmit = async () => {
    setCurrentStatus(false);

    const mobile = form.getFieldValue('mobile');
    // console.log(moblie);
    const res = await $http.getCode({ mobile });
    console.log(res);
    message.success(res.msg);

    setDisable(true);

    changeTime();
  };

  const changeTime = () => {
    let timer = setInterval(() => {
      if (time == 0) {
        clearInterval(timer);
        setCurrentStatus(true);
        setDisable(false);

        setTime(60);
        return;
      }
      setTime(--time);
    }, 1000);
  };

  const checkMobile = async () => {
    try {
      const mobileData = await form.validateFields(['mobile']);
      // console.log(data);
      setDisable(false);
    } catch (err) {
      setDisable(true);
    }
  };

  return (
    <>
      <FormItem name="mobile" rules={loginRules.mobileRule} hasFeedback>
        <Input
          placeholder="请输入手机号码"
          prefix={IconMap.Mobile}
          onChange={checkMobile}
        ></Input>
      </FormItem>
      <FormItem name="code" rules={loginRules.codeRule} hasFeedback>
        <Input
          placeholder="请输入验证码"
          prefix={IconMap.Code}
          addonAfter={
            <Button disabled={disable} onClick={_sendSubmit}>
              {currentStatus ? '发送验证码' : `${time}秒后重新发送`}
            </Button>
          }
        ></Input>
      </FormItem>
    </>
  );
};

export default SmCodeLogin;

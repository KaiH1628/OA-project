import React, { useState } from 'react';
import UpdatePassword from './components/UpdatePassword';
import SmCodeLogin from './components/SmCodeLogin';
import { Button, Form, Input, Row, message } from 'antd';
import IconMap from 'components/IconMap';
import './css/login.less';
import { useSelector } from 'react-redux';
import { history } from 'umi';
import $http from 'api';

const FormItem = Form.Item;

const forgetPassword = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(1);
  // const loading = useSelector((state) => state.loading);

  //组件选择函数
  const ComponentSelector = (props) => {
    return currentStep === 1 ? (
      <SmCodeLogin {...props} />
    ) : (
      <UpdatePassword {...props} />
    );
  };

  const submitSelect = async (data) => {
    currentStep === 1
      ? await _checkCode(data.code)
      : await _updatePassword(data.confirmNewPassword);
    // console.log(data)
  };

  const _checkCode = async (smCode) => {
    // console.log(smCode);
    const result = await $http.checkSmCode({ smCode });
    // console.log(result);
    if (result) {
      setCurrentStep(2);
    } else {
      message.error(result.msg);
    }
  };

  const _updatePassword = async (newPassword) => {
    const result = await $http.resetPassword({ newPassword });
    // console.log(result);
    if (result) {
      message.success(result.msg);
      history.replace('/users/login');
    } else {
      message.error(result.msg);
    }
  };

  return (
    <div className="form forget-password">
      <div className="forget-password-title">
        <span>{currentStep === 1 ? '忘记密码' : '重置密码'}</span>
      </div>
      <Form form={form} onFinish={submitSelect}>
        {ComponentSelector({ form, FormItem, Input })}
        <Row>
          <Button type="primary" block="true" htmlType="submit">
            {currentStep === 1 ? '下一步' : '重置'}
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default forgetPassword;

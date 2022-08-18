import React, { useState } from 'react';
import AccountLogin from './components/AccountLogin';
import SmCodeLogin from './components/SmCodeLogin';
import { Button, Form, Input, Row, Col } from 'antd';
import IconMap from 'components/IconMap';
import loginLogo from 'common/img/logo.svg';
import './css/login.less';
import { useDispatch, useSelector } from 'react-redux';
import { history } from 'umi';

const FormItem = Form.Item;

const login = () => {
  const [form] = Form.useForm();
  const [type, setType] = useState(0);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  // console.log(loading);

  //表单完成输入后提交的事件
  const submitUserInfo = (data) => {
    // console.log(data);
    dispatch({ type: 'user/login', payload: { ...data, type } });
  };

  //组件选择函数
  const ComponentSelector = (props) => {
    return !type ? <AccountLogin {...props} /> : <SmCodeLogin {...props} />;
  };

  return (
    <div className="form">
      <div className="logo">
        <img src={loginLogo} alt="" />
        <span>人事管理系统</span>
      </div>
      <Form form={form} onFinish={submitUserInfo}>
        {ComponentSelector({ form, FormItem, Input })}
        <Row>
          <Button
            type="primary"
            block="true"
            htmlType="submit"
            loading={loading.effects['user/login']}
          >
            登录
          </Button>
        </Row>
        <Row className="ft-12">
          <Col span={6} onClick={() => history.push('/users/forgetPassword')}>
            忘记密码？
          </Col>
          <Col
            span={18}
            className="align-right"
            onClick={() => setType(!type ? 1 : 0)}
          >
            {!type ? '使用手机号码登录' : '使用账户名密码登录'}
            {IconMap.ArrowRight}
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default login;

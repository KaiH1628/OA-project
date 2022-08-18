import React from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  Row,
  Col,
  message,
} from 'antd';
import staffList from 'staticList/staffList.js';
import DropPopover from '../../../components/DropPopover';
import moment from 'moment';
import { staffRule } from '../../../utils/staffRule';
import { useDispatch } from 'umi';
import $http from 'api';
import Upload from '../../../components/Upload';

const { Option } = Select;

const AddForm = ({ setDialogStatus, reloadList }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  //新增用户表单提交
  const onFinish = async (formData) => {
    // console.log(123);\
    // delete formData.departmentName;
    // delete formData.levelName;
    console.log(formData);
    const { code, msg } = await $http.createStaff(formData);
    if (code) {
      return;
    }
    message.success(msg);
    reloadList();
    setDialogStatus(false);
    form.resetFields();
  };

  //用户名密码检测
  const beforeChecked = async (item) => {
    if (item.itemName !== 'accountName' || item.itemName !== 'mobile') {
      return;
    }

    const reqData = await form.validateFields([item.itemName]);
    const { data, msg } = await $http.checkIsExists({ checkData: reqData });

    if (data) {
      form.setFieldsValue({
        [item.itemName]: '',
      });
      return message.error(msg);
    }
  };

  const formData = {
    input: (item) => (
      <Input
        placeholder={item.placeholderVal}
        type={item.itemName === 'password' ? 'password' : 'text'}
        onBlur={() => beforeChecked(item)}
      />
    ),

    select: (item) => (
      <Select placeholder={item.placeholderVal}>
        {item.optionData.map((val, index) => {
          return (
            <Option key={index} value={index}>
              {val}
            </Option>
          );
        })}
      </Select>
    ),

    date: (item) => (
      <DatePicker style={{ width: '100%' }} placeholder={item.placeholderVal} />
    ),

    popover: (item) => (
      <Input
        placeholder={item.placeholderVal}
        readOnly
        addonAfter={
          <DropPopover
            placeholderVal={item.placeholderVal}
            interfaceName={item.interfaceName}
            searchType={item.searchType}
            getSelectItem={(res) => {
              form.setFieldsValue({
                [item.itemName]: res[item.itemName],
                [item.itemName.split('N')[0]]: res._id,
              });
            }}
          ></DropPopover>
        }
      />
    ),

    upload: (item) => (
      <Upload
        newAvatar={(newAvatar) => {
          form.setFieldsValue({ newAvatar });
        }}
      />
    ),
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      {staffList.map((arr, index) => {
        return (
          <Row key={index} justify={'space-between'}>
            {arr.map((item, childIndex) => {
              return (
                <Col span="11" key={childIndex}>
                  <Form.Item
                    style={{ ...item.style }}
                    name={item.itemName}
                    label={item.labelTxt}
                    rules={staffRule[item.itemName]}
                  >
                    {formData[item.renderType](item)}
                  </Form.Item>
                </Col>
              );
            })}
          </Row>
        );
      })}

      <Col span={24} style={{ textAlign: 'right' }}>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            创建
          </Button>
        </Form.Item>
      </Col>
    </Form>
  );
};

export default AddForm;

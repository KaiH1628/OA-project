import { Table, message } from 'antd';
import React, { useState } from 'react';
import { EditableRow, EditableCell } from '../../../components/EditTable';
import Columns from './Columns';
import Dialog from '../../../components/Dialog';
import RecordTable from './RecordTable/index';
import $http from 'api';
import { useDispatch } from 'umi';

const TableList = ({ userInfo, staffList, loading, reloadPage }) => {
  const [currentRecord, setCurrentRecord] = useState(null);
  const [dialogStatus, setDialogStatus] = useState(false);
  const dispatch = useDispatch();

  //修改成功之后的保存事件
  const handleSave = async (obj) => {
    console.log(obj);
    if (obj.type === 'mobile') {
      const checkData = { mobile: obj.updateVal };
      const { data, msg } = await $http.checkIsExists({ checkData });
      console.log(data, msg);
      if (data) return message.error(msg);
    }
    //修改表单操作;
    const { code, msg } = await $http.updateStaff(obj);
    if (code) return message.error(msg);
    message.success(msg);
    reloadPage();
  };

  //打开员工指定表格
  const openReviewRecord = (record) => {
    setCurrentRecord(record);
    setDialogStatus(true);
  };

  //打开员工详情界面
  const openDetailDialog = (_id) => {
    dispatch({ type: 'staff/getStaffDetail', payload: { _id } });
  };

  //单选全选按钮触发函数
  const onselectChange = (ids) => {
    dispatch({
      type: 'common/saveSelectIds',
      payload: {
        ids,
      },
    });
  };

  return (
    <>
      <Table
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={staffList}
        //   dataSource={dataSource}
        columns={Columns({ handleSave, openReviewRecord, openDetailDialog })}
        pagination={false}
        rowKey={(record) => record._id}
        scroll={{ x: true }}
        loading={loading.effects['staff/initStaffList']}
        rowSelection={{ onChange: onselectChange }}
      />
      <Dialog
        title={currentRecord?.title}
        dialogStatus={dialogStatus}
        setDialogStatus={setDialogStatus}
        render={() => <RecordTable {...currentRecord} />}
      />
    </>
  );
};

export default TableList;

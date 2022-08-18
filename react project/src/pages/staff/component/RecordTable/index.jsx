import React, { useEffect, useState } from 'react';
import $http from 'api';
import { Table } from 'antd';
import { columnData } from './renderType';
import { setSourceMapRange } from 'typescript';

const RecordTable = ({ interfaceName, requestData, type }) => {
  const [source, setSource] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    initData();
  }, []);

  //- 表格初始化请求发送
  const initData = async (page = 1) => {
    const res = await $http[interfaceName]({ ...requestData, page });
    setSource(res.data.list);
    setTotal(res.data.total);
  };

  //- 分页点击事件
  const changePage = (page) => {
    _initData(page);
  };
  return (
    <div>
      <Table
        pagination={{ defaultPageSize: 5, onChange: changePage, total }}
        columns={columnData[type]}
        rowKey={(columns) => columns._id}
        dataSource={source}
      ></Table>
    </div>
  );
};

export default RecordTable;

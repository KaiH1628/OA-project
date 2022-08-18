import React, { useState, useEffect } from 'react';
import { Popover, Input, Pagination, List } from 'antd';
import './index.less';
const { Search } = Input;
import useCommon from '../../hook/useCommon';
import $http from 'api';

const DropPopover = ({
  placeholderVal,
  interfaceName,
  searchType,
  getSelectItem,
}) => {
  const [total, setTotal] = useState(0);
  const [page, setPage] = useCommon(0);
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);

  //页数改变
  const changePage = (currentPage) => {
    setPage(currentPage);
    initList({ page: currentPage });
  };

  useEffect(() => {
    initList();
  }, []);

  const initList = async (queryData = {}) => {
    const { data } = await $http[interfaceName]({
      page: page.current,
      size: 5,
      queryData,
    });
    setTotal(data.total);
    setList(data.list);
  };

  //搜索函数
  const onSearch = (val) => {
    const searchData = !val ? {} : { [searchType]: val };
    setPage(1);
    initList(searchData);
  };

  //创建当前列表的选定操作
  const selectItem = (item) => {
    setVisible(false);
    // console.log(item.departmentName);
    getSelectItem(item)
  };

  return (
    <>
      <Popover
        placement="bottomRight"
        visible={visible}
        onVisibleChange={(status) => {
          setVisible(status);
        }}
        title={
          <Search placeholder={placeholderVal} onSearch={onSearch}></Search>
        }
        content={
          <List
            dataSource={list}
            renderItem={(item) => (
              <List.Item
                style={{ cursor: 'pointer' }}
                onClick={() => selectItem(item)}
              >
                {item[searchType]}
              </List.Item>
            )}
            footer={
              <Pagination
                onChange={changePage}
                current={page.current}
                pageSize={5}
                total={total}
              ></Pagination>
            }
          ></List>
        }
        trigger="click"
      >
        <span className="add-icon">+</span>
      </Popover>
    </>
  );
};

export default DropPopover;

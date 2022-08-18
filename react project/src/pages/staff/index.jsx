import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'umi';
import TableHeader from '../../components/TableHeader';
import SearchContainer from '../../components/SearchContainer';
import FilterForm from './component/FilterForm';
import TableList from './component/TableList';
import './css/index.less';
import DrawerComponent from '../../components/Drawer';
import DetailForm from './component/DetailForm';
import useCommon from '../../hook/useCommon';
import Dialog from '../../components/Dialog';
import AddForm from './component/AddForm';

const staff = () => {
  const dispatch = useDispatch();
  // const [page, setPage] = useState(1);
  const { staffTotal, staffList, staffDetail } = useSelector(
    (state) => state.staff,
  );
  const { loading } = useSelector((state) => state);
  const { userInfo } = useSelector((state) => state.user);
  const [page, setPage] = useCommon();
  const [dialogStatus, setDialogStatus] = useState(false);

  useEffect(() => {
    initStaffList();
  }, []);

  const initStaffList = (data) =>
    dispatch({
      type: 'staff/initStaffList',
      payload: { size: 10, page: page.current,...data },
    });

  const changeCurrentPage = (currentPage) => {
    setPage(currentPage);
    // console.log(page)
    initStaffList();
  };

  //根据搜索条件进行列表展示
  const getQueryData = (queryData) => {
    initStaffList(queryData);
  };

  return (
    <div className="staff-container">
      {/* 公共表头部分 */}
      <TableHeader
        page={page.current}
        total={staffTotal}
        size={10}
        changeCurrentPage={changeCurrentPage}
        interfaceDelMethod={'deleteStaffs'}
        openAddDialog={() => setDialogStatus(true)}
      />
      {/* 左侧搜索区域 */}
      <SearchContainer
        render={() => (
          <FilterForm
            reload={(data) => setPage(1) && getQueryData(data)}
          ></FilterForm>
        )}
      />
      {/* 用户列表组件 */}
      <TableList
        userInfo={userInfo}
        staffList={staffList}
        loading={loading}
        reloadPage={initStaffList}
      />
      {/* 使用抽屉组件展示信息 */}
      <DrawerComponent
        title={staffDetail?.userName}
        _id={staffDetail?._id}
        render={() => (
          <DetailForm staffDetail={staffDetail} initStaffList={initStaffList} />
        )}
        reloadList={() => setPage(1) && initStaffList()}
        interfaceName="deleteStaffs"
      />

      {/* 新增员工组件 */}
      <Dialog
        title="新增员工"
        dialogStatus={dialogStatus}
        setDialogStatus={setDialogStatus}
        width={800}
        render={() => (
          <AddForm
            setDialogStatus={setDialogStatus}
            reloadList={() => setPage(1) && initStaffList()}
          />
        )}
      />
    </div>
  );
};

export default staff;

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'umi';
import StaffAmount from './component/StaffAmount';
import './css/index.less';
import OldStaffTable from './component/OldStaffTable';
import $http from 'api';
import Pie from './component/Pie';
import Column from './component/Column';
import AgeColumn from './component/AgeColumn';

const dashboard = () => {
  const {
    amountDataList,
    pieList,
    columnList,
    marriageData,
    staffList,
    constellationData,
  } = useSelector((state) => state.dashboard);
  // console.log(pieList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'dashboard/initDashboardList' });
  }, []);

  return (
    <div className="dashboard-container">
      {/* 员工展示组件 */}
      {amountDataList.map((item, index) => (
        <StaffAmount key={index} {...item} />
      ))}

      {/* 学历情况，员工性别 */}
      {pieList?.map((item, index) => (
        <Pie key={index} {...item} />
      ))}

      {/* 年龄柱状图 */}
      {pieList && <AgeColumn {...pieList[1]} />}
      {/* 员工婚姻状况 */}
      <Pie {...marriageData} />

      {columnList?.map((item, index) => (
        <Column key={index} {...item} />
      ))}

      {/* 最老的10个员工 */}
      <OldStaffTable {...staffList} />
      {/* 星座情况 */}
      <Pie {...constellationData} />
    </div>
  );
};

export default dashboard;

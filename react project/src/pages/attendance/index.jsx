import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'umi';
import AttendanceTable from './component/Table';
import Chart from './component/Chart';
import "./css/index.less"

const attendance = () => {
  const dispatch = useDispatch();
  const { tableList, chartList } = useSelector((state) => state.attendance);

  useEffect(() => {
    dispatch({ type: 'attendance/initAttendanceList' });
  }, []);

  return (
    <div className="attendance-container">
      <div className="chart-list-container">
        {chartList.map((item, index) => (
          <Chart {...item} key={index} />
        ))}
      </div>
      <div className="table-list-container">
        {tableList.map((item, index) => (
          <AttendanceTable {...item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default attendance;

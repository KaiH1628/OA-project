import React from 'react';
import ReactEChart from 'echarts-for-react';

const Column = ({ title, renderList, styleData, br = false }) => {
  const option = {
    title: { text: title, left: 'left' },
    tooltip: { trigger: 'axis' },
    yAxis: [{ type: 'value', minInterval: 1 }],
    xAxis: [
      {
        type: 'category',
        data: renderList.xData,
        axisLabel: {
          interval: 0,
          formatter: (value) => (br ? value.split('').join('\n') : value),
        },
      },
    ],
    series: {
      name: '人数',
      type: 'bar',
      data: renderList.yData,
      lable: {
        show: true,
        precision: 1,
        position: 'top',
        valueAnimation: true,
      },
    },
  };
  return (
    <div className="staff-amount-container" style={{ ...styleData }}>
      <ReactEChart className="react_for_echarts" option={option} />
    </div>
  );
};

export default Column;

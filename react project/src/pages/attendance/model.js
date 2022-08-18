import $http from 'api';
export default {
  namespace: 'attendance',
  state: {
    tableList: [],
    chartList: [],
  },
  reducers: {
    formatData(state, { payload }) {
      const formatData = {
        tableList: [
          {
            title: '迟到详情',
            renderList: [
              {
                _id: '6138b3d1975f4fa0b152f03f',
                createTime: '2021-10-08T11:16:12.205Z',
                staffName: '路嘉良',
                staffDepartment: '运营部',
                attendanceType: 3,
                __v: 0,
              },
              {
                _id: '6138b442975f4fa0b152f048',
                createTime: '2021-08-08T11:16:12.205Z',
                staffName: '路嘉良',
                staffDepartment: '运营部',
                attendanceType: 3,
                __v: 0,
              },
              {
                _id: '6140b4e6b442ed7f3479a940',
                createTime: '2021-09-09T02:06:03.375Z',
                staffName: '韩刚',
                staffDepartment: '研发部',
                attendanceType: 3,
                __v: 0,
              },
              {
                _id: '61415790cb657a226bb5258e',
                createTime: '2021-08-09T00:00:00.000Z',
                staffName: '韩刚',
                staffDepartment: '研发部',
                attendanceType: 3,
                __v: 0,
              },
            ],
          },
          {
            title: '早退详情',
            renderList: [
              {
                _id: '6138b436975f4fa0b152f045',
                createTime: '2021-09-12T14:47:01.567Z',
                staffName: '路嘉良',
                staffDepartment: '运营部',
                attendanceType: 4,
                __v: 0,
              },
              {
                _id: '61396c20aaf916d5cc514196',
                createTime: '2021-09-09T02:06:03.375Z',
                staffName: '韩刚',
                staffDepartment: '研发部',
                attendanceType: 4,
                __v: 0,
              },
              {
                _id: '6139c8383fc4bb1bffca8425',
                staffName: '路嘉良',
                staffDepartment: '运营部',
                attendanceType: 4,
                createTime: '2021-09-09T08:39:20.579Z',
                __v: 0,
              },
              {
                _id: '6139c8383fc4bb1bffca8428',
                staffName: '路嘉良',
                staffDepartment: '运营部',
                attendanceType: 4,
                createTime: '2021-09-09T08:39:20.921Z',
                __v: 0,
              },
              {
                _id: '613b193d1bb9c54c5e5b5480',
                createTime: '2021-09-09T02:06:03.375Z',
                staffName: '韩刚',
                staffDepartment: '研发部',
                attendanceType: 4,
                __v: 0,
              },
            ],
          },
        ],
        chartList: [
          {
            title: '迟到员工数量',
            renderList: {
              xData: [
                '2021-08-08T11:16:12.205Z',
                '2021-08-09T00:00:00.000Z',
                '2021-09-09T02:06:03.375Z',
                '2021-10-08T11:16:12.205Z',
              ],
              yData: [1, 1, 1],
            },
          },
          {
            title: '早退员工数量',
            renderList: {
              xData: [
                '2021-09-09T02:06:03.375Z',
                '2021-09-09T02:06:03.375Z',
                '2021-09-09T08:39:20.579Z',
                '2021-09-09T08:39:20.921Z',
                '2021-09-12T14:47:01.567Z',
              ],
              yData: [4, 1],
            },
          },
        ],
      };
      return { ...state, ...formatData };
    },
  },
  effects: {
    *initAttendanceList({}, { put, call }) {
      const data = yield call($http.getAttendanceList);
      //   console.log(data);
      yield put({ type: 'formatData' });
    },
  },
};

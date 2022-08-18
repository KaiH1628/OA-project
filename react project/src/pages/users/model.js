import $http from 'api';
import { message } from 'antd';
import { history } from 'umi';

export default {
  namespace: 'user',
  state: {
    userInfo: sessionStorage.getItem('userProfile')
      ? JSON.parse(sessionStorage.getItem('userProfile'))
      : null,
  },
  reducers: {
    UpdateUserInfo: (state, { payload }) => ({ ...state, ...payload }),
  },
  effects: {
    *login({ payload }, { put, call }) {
      // console.log(payload);
      const { data, msg } = yield call($http.userLogin, payload);
      // console.log(data, msg);
      // message.success(msg);
      if (!data) {
        message.error(msg);
        return;
      }
      sessionStorage.setItem('userProfile', JSON.stringify(data));
      yield put({ type: 'UpdateUserInfo', payload: { userInfo: data } });
      const { data: routeList } = yield call($http.getRouteList);
      // console.log(routeList);
      sessionStorage.setItem('routeList', JSON.stringify(routeList));
      history.push(routeList[0].route);
    },
  },
};

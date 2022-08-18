import $http from 'api';
// import { message } from 'antd';

export default {
  namespace: 'common',
  state: {
    collapse: false,
    isShowDetailDialog: false,
    isClearForm: false,
    ids: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      //   console.log(arguments);
      dispatch({ type: 'queryLoginStatus', payload: { history } });
    },
  },
  reducers: {
    changeCollapse: (state, { payload }) => ({ ...state, ...payload }),
    setShowDetailDialog: (state, { payload }) => ({ ...state, ...payload }),
    setClearForm: (state, { payload }) => ({ ...state, ...payload }),
    saveSelectIds: (state, { payload }) => ({ ...state, ...payload }),
  },
  effects: {
    *queryLoginStatus({ payload }, { put, call }) {
      const {
        history,
        history: {
          location: { pathname },
        },
      } = payload;

      if (pathname !== '/users/login' && pathname != '/users/forgetPassword') {
        // const data = yield call($http.queryLoginStatus);
        // history.replace('/users/login');
        if (
          !sessionStorage.getItem('userProfile') ||
          !sessionStorage.getItem('token') ||
          !sessionStorage.getItem('routeList')
        ) {
          history.replace('/users/login');
        } else {
          const data = yield call($http.queryLoginStatus);
          if (data.code !== 0) {
            return;
          }
          const res = yield call($http.getRouteList);
          //   console.log(res.data);/
          sessionStorage.setItem('routeList', JSON.stringify(res.data || []));
        }
      } else {
        // history.push('/dashBoard');
        sessionStorage.clear();
      }
    },
  },
};

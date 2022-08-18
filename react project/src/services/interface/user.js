//- 引入封装好的fetch方法

import ajax from '../http.js';

//- 用户登录接口api
export const userLogin = (params) => ajax.post('/login', params);

//手机验证api
export const getCode = (params) => ajax.get('/getCode', params);

//验证码检测api
export const checkSmCode = (params) => ajax.get('/checkSmCode', params);

//重置密码
export const resetPassword = (params) => ajax.post('/resetPassword', params);

//检测用户是否登录
export const queryLoginStatus = () => ajax.get('/queryLoginStatus');

//前端路由表
export const getRouteList = () => ajax.get('/getRouteList');

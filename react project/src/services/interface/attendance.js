//- 引入封装好的fetch方法

import ajax from '../http.js';

export const getAttendanceList = () => ajax.get('/getAttendanceTable');

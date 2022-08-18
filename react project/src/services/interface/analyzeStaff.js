//- 引入封装好的fetch方法

import ajax from '../http.js';


export const analyzeStaff = () => ajax.get('/analyzeStaff');

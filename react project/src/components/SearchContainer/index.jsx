import React, { useState } from 'react';
import classNames from 'classnames';
import IconMap from '../IconMap';
import './index.less';
import { useDispatch } from 'umi';

const SearchContainer = ({ render }) => {
  const [closeStatus, setCloseStatus] = useState(false);
  const dispatch = useDispatch();

  // 清空表单
  const clearForm = () => {
    // console.log('clearForm');
    dispatch({ type: 'common/setClearForm', payload: { isClearForm: true } });
  };
  return (
    <div className={classNames('filter-wrapper', { close: closeStatus })}>
      <div className="filter-title-wrapper">
        <span>字段过滤</span>
        <span className="c-r" onClick={clearForm}>
          {IconMap.reload}
        </span>
      </div>
      <div
        className={classNames('filter-form-wrapper', { opacity: closeStatus })}
      >
        {render()}
      </div>
      <div className="close-tip" onClick={() => setCloseStatus(!closeStatus)}>
        {closeStatus ? IconMap.right : IconMap.left}
      </div>
    </div>
  );
};

export default SearchContainer;

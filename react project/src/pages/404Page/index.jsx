import React from 'react';
import unImg from 'common/img/not_found.png';
import { transform } from 'typescript';

const NotFound = () => {
  return (
    <div
      style={{
        display: 'flex',
        // position: 'absolute',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
        // left: '50%',
        // transform: translateX('-50%'),
      }}
    >
      <img src={unImg} alt="" />
    </div>
  );
};

export default NotFound;

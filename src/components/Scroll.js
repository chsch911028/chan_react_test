import React from 'react';

const Scroll = (props) => {
  return (
    <div className='scroll-box'>
      {props.children}
    </div>
  );
};

export default Scroll;
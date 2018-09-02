import React from 'react';

const Modal = ({onModalViewClick, roomImageId}) => {
	return (
    <div className='modal_view' >
      <div className='modal_view_bg' onClick={onModalViewClick}></div>
      <img className='modal_img' src={roomImageId} alt='room_image' />
    </div>
	)
}

export default Modal;
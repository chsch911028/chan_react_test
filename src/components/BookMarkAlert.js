import React from 'react';

const BookMarkAlert = ({id, type, onUndoBookMark, onUpdateStatusBMAV }) => {
	let typeName = type === 'add' ? '추가' : '삭제';
  return (
    <div roomid={id} className='alert_box' onMouseEnter={onUpdateStatusBMAV} onMouseLeave={onUpdateStatusBMAV}>
     	<div className='alert_text'>북마크에 사진이 {typeName}되었습니다.</div>
     	<div roomid={id} className='alert_cancel' onClick={onUndoBookMark}>실행취소</div>
    </div>
  );
}

export default BookMarkAlert;

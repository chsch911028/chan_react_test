import React from 'react';

const Room = ({ id, type, image_url, brand_name, name, cost, selling_cost, bookmark, bookMarkedIds, onBookMarkClick,
onRoomImgClick }) => {
  
	const roomCardStyle = {
		backgroundImage: "url('"+image_url+"')",
		backgroundSize: "cover",
		backgroundPosition: "center",
		position:"relative",
		display: "inline-block",
		width: "330px",
		height: "340px",

	}

	const typeName = (type) => {
		switch(type){
			case 'Project' : return '집들이';
			case 'Production' : return '제품';
			case 'Card' : return '사진';
			case 'Exhibition': return '기획전';
			default : return '';
		}
	}

  return (
  	<div className='card'>
	    <div className='room_card' style={roomCardStyle} value={image_url} onClick={onRoomImgClick}>
  	    <div className='status_bar'>
  	    	<div className='room_type'>{typeName(type)}</div>
    	    <img className='bookmark_img' alt='rooms' 
      	  	src={bookMarkedIds.includes(id.toString()) ? 
        			'https://s3.ap-northeast-2.amazonaws.com/bucketplace-coding-test/res/action-scrap-circle-b.svg' :
        			'https://s3.ap-northeast-2.amazonaws.com/bucketplace-coding-test/res/action-scrap-circle-w.svg'}
        		id={id} onClick={onBookMarkClick}  />
      	</div>
    	</div>
    </div>
  );
}

export default Room;

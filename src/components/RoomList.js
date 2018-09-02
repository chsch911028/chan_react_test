import React from 'react';
import Room from './Room';

const RoomList = ({ rooms, bookmark, bookMarkedIds, onBookMarkClick, onRoomImgClick }) => {
  return (
    <div className='room_list'>
      {

        rooms.map((room, i) => {
          return (
            <Room
              key={i}
              id={room.id}
              type={room.type}
              image_url={room.image_url}
              brand_name={room.brand_name}
              name={room.name}
              cost={room.cost}
              selling_cost={room.selling_cost}
              onBookMarkClick={onBookMarkClick}
              bookMarkedIds={bookMarkedIds}

              onRoomImgClick={onRoomImgClick}
              />
          );
        })
      }
    </div>
  );
}

export default RoomList;
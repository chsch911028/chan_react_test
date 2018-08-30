import React from 'react';
import Room from './Room';

const RoomList = ({ rooms, bookmark, bookMarkedIds, onBookMarkClick, onRoomImgClick }) => {
  return (
    <div>
      {
        
        rooms.map((user, i) => {
          return (
            <Room
              key={i}
              id={rooms[i].id}
              type={rooms[i].type}
              image_url={rooms[i].image_url}
              brand_name={rooms[i].brand_name}
              name={rooms[i].name}
              cost={rooms[i].cost}
              selling_cost={rooms[i].selling_cost}
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
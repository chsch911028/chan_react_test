import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  setFilterValue, 
  changeBookMarkView, changeBookMarkedIds, 
  roomImgClick,
  requestRooms } from '../actions';

import RoomList from '../components/RoomList';
import FilterBox from '../components/FilterBox';
import Scroll from '../components/Scroll';

import './App.css';

const mapStateToProps = (state) => {
  return {
    filterValue: state.filterRooms.filterValue,


    isBookMarkView: state.bookmarkRooms.isBookMarkView,
    bookMarkedIds: state.bookmarkRooms.bookMarkedIds,

    roomImageClicked: state.viewRooms.roomImageClicked,
    roomImageId: state.viewRooms.roomImageId,

    rooms: state.requestRooms.rooms,
    isPending: state.requestRooms.isPending
  }
}

//onChangeBookMarkIds : () => dispatch( changeBookMarkedIds(Ids) ),
//Ids에 배열 넣어주면 됨
const mapDispatchToProps = (dispatch) => {
  return{
    
    onFilterChange : (event) => dispatch( setFilterValue(event.target.getAttribute('value')) ),
    
    onChangeBookMarkView : (event) => {
      dispatch(changeBookMarkView(event.target.getAttribute('value')))
    },
    onChangeBookMarkIds : (event) => {
      let roomID = event.target.getAttribute('id');
          localStorage.getItem(roomID) ? 
          localStorage.removeItem(roomID) :
          localStorage.setItem(roomID,'TRUE');
    
          dispatch( changeBookMarkedIds(Object.keys(localStorage)) )
    },

    onRoomImgClick : (event) => dispatch( roomImgClick(event.target.getAttribute('value')) ),

    onRequestRooms : () => dispatch( requestRooms() )
  }
}


class App extends Component {

  componentDidMount() {
    this.props.onRequestRooms();
  }

  render() {

    const { 
      onFilterChange, onChangeBookMarkView, onChangeBookMarkIds, onRoomImgClick,
      rooms, filterValue, isBookMarkView, bookMarkedIds, roomImageClicked, isPending } = this.props;
    
    const bookMakredRooms = rooms.filter( room => {
      return bookMarkedIds.includes(room.id.toString());
    });

    const handledRooms = isBookMarkView === 'true' ? bookMakredRooms : rooms;

    const flteredRooms = handledRooms.filter( room => {
      return room.type.toLowerCase().includes(filterValue.toLowerCase());
    });

    return (
        <div>
          <h1>오늘의 집</h1>
          <div className='nav_bar'>
            <span className={ isBookMarkView === 'true' ? 'nav_item' : 'nav_item_focus'}
                  value='false' onClick={onChangeBookMarkView}>전체보기</span>
            <span className={ isBookMarkView === 'true' ? 'nav_item_focus' : 'nav_item'}
                  value='true' onClick={onChangeBookMarkView}>북마크</span>
          </div>
          <FilterBox filterValue={filterValue} onFilterChange={onFilterChange}/>
          <Scroll>
            { isPending ? <h1>로딩중</h1> :
              <RoomList className='room_list'
               rooms={flteredRooms} bookMarkedIds={bookMarkedIds} onBookMarkClick={onChangeBookMarkIds}
               onRoomImgClick={onRoomImgClick}
              />
            }
          </Scroll>
        </div>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
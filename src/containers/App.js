import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  setFilterValue, 
  changeBookMarkView, changeBookMarkedIds, 
  roomImgClick, modalViewClick,
  addBookMarkAlert, removeBookMarkAlert, forceRemoveBookMarkAlert, removeBookMarkAlertAsync,
  adjustBookMarkAlert, updateStatusBookMarkAlertAsync, mouseOverBookMarkAlert, mouseOutBookMarkAlert,
  requestRooms } from '../actions';

import RoomList from '../components/RoomList';
import FilterBox from '../components/FilterBox';
import Scroll from '../components/Scroll';
import BookMarkAlertList from '../components/BookMarkAlertList';

import './App.css';

const mapStateToProps = (state) => {
  return {
    filterValue: state.filterRooms.filterValue,

    isBookMarkView: state.bookmarkRooms.isBookMarkView,
    bookMarkedIds: state.bookmarkRooms.bookMarkedIds,

    roomImageClicked: state.viewRooms.roomImageClicked,
    roomImageId: state.viewRooms.roomImageId,

    rooms: state.requestRooms.rooms,
    isPending: state.requestRooms.isPending,

    alerts: state.bookMarkAlerts.alerts
  }
}

//onChangeBookMarkIds : () => dispatch( changeBookMarkedIds(Ids) ),
//Ids에 배열 넣어주면 됨
const mapDispatchToProps = (dispatch) => {
  return{
    
    onFilterChange : (event) => dispatch( setFilterValue(event.currentTarget.getAttribute('value')) ),    
    onChangeBookMarkView : (event) => {
      dispatch(changeBookMarkView(event.currentTarget.getAttribute('value')))
    },
    onChangeBookMarkIds : (event) => {
      event.stopPropagation();

      let changedType;
      let roomID = event.currentTarget.getAttribute('roomid');
      
      localStorage.getItem(roomID) ?
      ( localStorage.removeItem(roomID), changedType = 'remove' ) :
      ( localStorage.setItem(roomID,'TRUE'), changedType = 'add' );

      dispatch( changeBookMarkedIds({ Ids: Object.keys(localStorage) }));
      dispatch( addBookMarkAlert({ id: roomID, status: 'able', type: changedType, onMouseCnt: 0, outMouseCnt: 0 }) );
      dispatch( removeBookMarkAlertAsync(roomID) );
    },
    onUndoBookMark : (event) => {
      
      event.stopPropagation();

      let changedType;
      let roomID = event.currentTarget.getAttribute('roomid');
      
      if(localStorage.getItem(roomID)){
        localStorage.removeItem(roomID); changedType = 'remove';
      }else{
        localStorage.setItem(roomID,'TRUE'); changedType = 'add';
      }

      dispatch( changeBookMarkedIds({ Ids: Object.keys(localStorage) }));
      dispatch( forceRemoveBookMarkAlert(roomID) );      
    },
    onUpdateStatusBMAV : (event) => {
      
    

      const roomID = event.currentTarget.getAttribute('roomid');
      const index = +(event.currentTarget.getAttribute('index'));
      
      event.type === 'mouseenter' ? 
      ( dispatch(mouseOverBookMarkAlert({ id: roomID, status: 'disable'}, index)) ) :
      ( 
        dispatch(mouseOutBookMarkAlert({ id: roomID, status: 'able' })),
        dispatch(removeBookMarkAlertAsync(roomID))
      )
        
    },

    onRoomImgClick : (event) => dispatch( roomImgClick(event.currentTarget.getAttribute('value')) ),
    onModalViewClick : () => dispatch( modalViewClick()),
    onRequestRooms : () => dispatch( requestRooms() ),
  }
}


class App extends Component {

  componentDidMount() {
    this.props.onRequestRooms();

  }

  render() {

    const {  
      filterValue, onFilterChange, 
      isBookMarkView, onChangeBookMarkView, 
      onChangeBookMarkIds, bookMarkedIds, bookMarkChangedType, onUndoBookMark, onUpdateStatusBMAV,
      onRoomImgClick, onModalViewClick, roomImageId, roomImageClicked,
      rooms, isPending,
      alerts } = this.props;
    
    const bookMakredRooms = rooms.filter( room => {
      return bookMarkedIds.includes(room.id.toString());
    });

    const handledRooms = isBookMarkView === 'true' ? bookMakredRooms : rooms;

    const flteredRooms = handledRooms.filter( room => {
      return room.type.toLowerCase().includes(filterValue.toLowerCase());
    });


    return (
        <div className='main'>
          { roomImageClicked ?
              <div className='modal_view' >
                <div className='modal_view_bg' onClick={onModalViewClick}></div>
                <img className='modal_img' src={roomImageId} />
              </div>
            : undefined
          } 
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
          <BookMarkAlertList 
              alerts={alerts}
              onUndoBookMark={onUndoBookMark}
              onUpdateStatusBMAV={onUpdateStatusBMAV}
          />

        </div>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  setFilterValue, 
  changeBookMarkView, changeBookMarkedIds, 
  roomImgClick, modalViewClick,
  addBookMarkAlert, forceRemoveBookMarkAlert, removeBookMarkAlertAsync, mouseOverBookMarkAlert, mouseOutBookMarkAlert,
  requestRooms, 
} from '../actions';

//components
import Modal from '../components/Modal';
import Header from '../components/Header';
import Nav from '../components/Nav';
import FilterBox from '../components/FilterBox';
import Scroll from '../components/Scroll';
import RoomList from '../components/RoomList';
import BookMarkAlertList from '../components/BookMarkAlertList';

//CSS
import './App.css';

const mapStateToProps = (state) => {
  return {
    //Filter 기능 관련
    filterValue: state.filterRooms.filterValue,
    //BookMark 기능 관련
    isBookMarkView: state.bookmarkRooms.isBookMarkView,
    bookMarkedIds: state.bookmarkRooms.bookMarkedIds,
    //Modal 기능 관련
    roomImageClicked: state.viewRooms.roomImageClicked,
    roomImageId: state.viewRooms.roomImageId,
    //Room 컴포넌트 관련
    rooms: state.requestRooms.rooms,
    page: state.requestRooms.page,
    isPending: state.requestRooms.isPending,
    //BookMarkAlert 컴포넌트 관련
    alerts: state.bookMarkAlerts.alerts
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    //Filter 변경시 - 필터값 변경
    onFilterChange : (event) => dispatch( setFilterValue(event.currentTarget.getAttribute('value')) ),    
    //Router 변경시 - pathname에 따른 이벤트 발생
    onRouterChanged : (obj) => {
      obj.pathname === '/book-mark' ? dispatch( changeBookMarkView(obj.value) ) : undefined;
    },
    //BookMark된 방보기 클릭한 경우 발생
    onChangeBookMarkView : (event) => {
      dispatch(changeBookMarkView(event.currentTarget.getAttribute('value')))
    },
    //BookMark 정보가 변경되는 경우 roomID 추가 또는 삭제
    onChangeBookMarkIds : (event) => {
      event.stopPropagation();

      let changedType;
      const roomID = event.currentTarget.getAttribute('roomid');
      
      //로컬 스토리지에 현재 북마크 이미지가 클릭된 방의 ID가 이미 있는 경우 제거, 없는 경우 추가
      localStorage.getItem(roomID) 
      ? ( localStorage.removeItem(roomID), changedType = 'remove' )
      : ( localStorage.setItem(roomID,'TRUE'), changedType = 'add' );

      // 북마크된 방 아이디 배열 상태를 변경
      dispatch( changeBookMarkedIds({ Ids: Object.keys(localStorage) }));
      // 북마크 알리창 생성
      dispatch( addBookMarkAlert({ id: roomID, type: changedType, onMouseCnt: 0, outMouseCnt: 0 }) );
      // **초 뒤 북마크 알리창 제거
      dispatch( removeBookMarkAlertAsync(roomID) );
    },
    // 북마크 알리창 '실행취소' 클릭시 발생 -> 로컬 스토리지에서 방 이이디 지우고, 알림창 제거, 북마크 아이디 배열 상태 변경
    onUndoBookMark : (event) => {
      event.stopPropagation();

      const roomID = event.currentTarget.getAttribute('roomid');
      
      localStorage.getItem(roomID) 
      ? localStorage.removeItem(roomID) 
      : localStorage.setItem(roomID,'TRUE');

      // 북마크된 방 아이디 배열 상태를 변경
      dispatch( changeBookMarkedIds({ Ids: Object.keys(localStorage) }));
      // 실행취소의 경우 북마크 알리창 바로 제거
      dispatch( forceRemoveBookMarkAlert(roomID) );      
    },    
    // 북마크 알림창에 마우스가 올라가거나/내려간 경우 발생 -> mouse on, out 횟수 체크
    onUpdateStatusBMAV : (event) => {
      
      const roomID = event.currentTarget.getAttribute('roomid');
      
      event.type === 'mouseenter' 
      ? ( dispatch(mouseOverBookMarkAlert({ id: roomID })) ) 
      : ( dispatch(mouseOutBookMarkAlert({ id: roomID })),
          dispatch(removeBookMarkAlertAsync(roomID))
        )
        
    },
    // 방 이미지 클릭식 발생 -> 모달 보여주기
    onRoomImgClick : (event) => dispatch( roomImgClick(event.currentTarget.getAttribute('value')) ),
    // 모달 클릭시 발생 -> 모달 제거하기
    onModalViewClick : () => dispatch(modalViewClick()),
    // API 통신 요청
    onRequestRooms : () => dispatch(requestRooms()),
    // 스크롤이 바닥에 닿은 경우 발생 -> 방 정보 API 통신 요청
    onInfiniteScroll : (event) => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {          
          dispatch(requestRooms());
        }            
    },

  }
}


class App extends Component {

  componentDidMount() {
    //1. URL이 /book-mark 인 경우 북마크된 방을 보여주는 이벤트 발생
    this.props.location.pathname === '/book-mark' 
    ? this.props.onRouterChanged({ pathname: this.props.location.pathname, value:'true' }) 
    : undefined;
    //2. 방 정보 API 요청
    this.props.onRequestRooms();    
    //3. 인피니트 스크롤을 위한 이벤트 할당
    window.addEventListener('scroll', this.props.onInfiniteScroll);
  }

  componentWillUnmount() {
    //4. 스크롤 이벤트 제거
    window.removeEventListener('scroll', this.props.onInfiniteScroll);
  }

  render() {

    const {        
      filterValue, onFilterChange, 
      isBookMarkView, onChangeBookMarkView, 
      onChangeBookMarkIds, bookMarkedIds, onUndoBookMark, onUpdateStatusBMAV,
      onRoomImgClick, onModalViewClick, roomImageId, roomImageClicked,
      rooms, alerts } = this.props;
    
    //1. 북마크된 방(배열) 처리
    const bookMakredRooms = rooms.filter( room => {
        return bookMarkedIds.includes(room.id.toString());
    });

    //2. 북마크된 방을 보여주는 뷰인지 아닌지 판단 -> 그에 따른 방 데이터(배열) 선택
    const handledRooms = isBookMarkView === 'true' ? bookMakredRooms : rooms;

    //3. 각 카테고리(필터)에 맞는 방(배열) 처리
    const filteredRooms = handledRooms.filter( room => {
      return room.type.toLowerCase().includes(filterValue.toLowerCase());
    });

    return (
        <div className='main'>
          { // 방 이미지 클릭시 '모달' 발생
            roomImageClicked
            ? <Modal onModalViewClick={onModalViewClick} roomImageId={roomImageId} />
            : undefined
          }           
          <Header />
          <Nav onChangeBookMarkView={onChangeBookMarkView} />
          <FilterBox filterValue={filterValue} onFilterChange={onFilterChange}/>
          <Scroll>          
            { 
              <RoomList className='room_list'
               rooms={filteredRooms} bookMarkedIds={bookMarkedIds} 
               onBookMarkClick={onChangeBookMarkIds}
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
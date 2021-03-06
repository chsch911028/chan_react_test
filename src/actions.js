import { apiCall } from './api/api';
import {
	CHANGE_FILTER_VALUE,

	CHANGE_BOOK_MARK_ROOMS,
	CHANGE_BOOK_MARK_VEIW,

	ROOM_IMAGE_CLICK,
	MODAL_VIEW_CLICK,

	REQUEST_ROOMS_PENDING,
	REQUEST_ROOMS_SUCCESS,
	REQUEST_ROOMS_FAILED,

	ADD_BOOK_MARK_ALERT,
	REMOVE_BOOK_MARK_ALERT,
	FORCE_REMOVE_BOOK_MARK_ALERT,
	ADJUST_BOOK_MARK_ALERT,
	MOUSE_OVER_BOOK_MARK_ALERT,
	MOUSE_OUT_BOOK_MARK_ALERT,

	INCREASE_SCROLL_PAGE,
	RESET_SCROLL_PAGE
} from './constants'

const BOOK_MARK_ALERT_VIEW_TIME = 3000;

//#1. 카테고리별 방 보여주기
export const setFilterValue = (text) => ({ type: CHANGE_FILTER_VALUE, payload: text })

//#2. 북마크된 view/방 변경하기
export const changeBookMarkView = (bool) => ({ type: CHANGE_BOOK_MARK_VEIW, payload: bool })
export const changeBookMarkedIds = (obj) => ({ type: CHANGE_BOOK_MARK_ROOMS, payload: obj })

//#3. 방 이미지/ 모달 클릭한 경우 -> 상태 변경
export const roomImgClick = (imgURL) => ({ type: ROOM_IMAGE_CLICK, payload: imgURL })
export const modalViewClick = () => ({ type: MODAL_VIEW_CLICK, payload: false })

//#4. 방 관련 JSON 데이터 받아오기
export const requestRooms = () => (dispatch, getState) => {

	if(!getState().requestRooms.isPending){
		
		getState().scroll.scrollPage < getState().requestRooms.page
		? dispatch({ type: INCREASE_SCROLL_PAGE, payload: true})
		: undefined;
		
		dispatch({ type: REQUEST_ROOMS_PENDING })
		apiCall('https://s3.ap-northeast-2.amazonaws.com/bucketplace-coding-test/feed/page_'+(getState().requestRooms.page+1)+'.json')
		.then(date => {
			// DATA를 rooms state에 넣어주고, ScrollPage 값도 증가시킴.
			dispatch({ type: REQUEST_ROOMS_SUCCESS, payload: date })
			dispatch({ type: INCREASE_SCROLL_PAGE, payload: true})
		})
		.catch(error => dispatch({ type: REQUEST_ROOMS_FAILED, payload: error }))
	}
}

export const requestRoomsAsync = () => (dispatch, getState) => {
	//비동기가 필요한 경우 사용	
	if(!getState().requestRooms.isPending && !getState().requestRooms.error){
		dispatch({ type: REQUEST_ROOMS_PENDING });
		setTimeout(() => {
			apiCall('https://s3.ap-northeast-2.amazonaws.com/bucketplace-coding-test/feed/page_'+(getState().requestRooms.page+1)+'.json')
			.then(date => dispatch({ type: REQUEST_ROOMS_SUCCESS, payload: date }))
			.catch(error => dispatch({ type: REQUEST_ROOMS_FAILED, payload: error }))			
		}, 0)		
	}	
}

//#5. 북마크 알림창 
export const addBookMarkAlert = (obj) => (dispatch,getState) => {
	// 북마크 알리참은 2개만 보여주는 기능을 위해 아래와 같이 처리
	getState().bookMarkAlerts.alerts.length >= 2 ?
	dispatch({ type: ADJUST_BOOK_MARK_ALERT, payload: obj }) :
	dispatch({ type: ADD_BOOK_MARK_ALERT, payload: obj });
}
export const adjustBookMarkAlert = (id) => ({ type: ADJUST_BOOK_MARK_ALERT, payload: id })
export const removeBookMarkAlert = (id) => ({ type: REMOVE_BOOK_MARK_ALERT, payload: id })
export const removeBookMarkAlertAsync = (id) => (dispatch) => {
	setTimeout(() => { dispatch({ type: REMOVE_BOOK_MARK_ALERT, payload: id}) }, BOOK_MARK_ALERT_VIEW_TIME)
}
export const forceRemoveBookMarkAlert = (id) => ({ type: FORCE_REMOVE_BOOK_MARK_ALERT, payload: id })
export const mouseOverBookMarkAlert = (obj) => ({ type: MOUSE_OVER_BOOK_MARK_ALERT, payload: obj })
export const mouseOutBookMarkAlert = (obj) => (dispatch) => {
	setTimeout( () => { dispatch({ type: MOUSE_OUT_BOOK_MARK_ALERT, payload: obj}) }, BOOK_MARK_ALERT_VIEW_TIME );
}


//#6. Sroll 상태
export const increaseScrollPage = () => ({ type: INCREASE_SCROLL_PAGE, payload: true })
export const resetScrollPage = () => ({ type: RESET_SCROLL_PAGE, payload: true})
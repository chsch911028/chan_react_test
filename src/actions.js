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
	UPDATE_STATUS_BOOK_MAKR_ALERT
} from './constants'

const BOOK_MARK_ALERT_VIEW_TIME = 3000;

//#1. 카테고리별 방 보여주기
export const setFilterValue = (text) => ({ type: CHANGE_FILTER_VALUE, payload: text })

//#2. 북마크된 view/방/알림창 변경하기
export const changeBookMarkView = (bool) => ({ type: CHANGE_BOOK_MARK_VEIW, payload: bool })
export const changeBookMarkedIds = (obj) => ({ type: CHANGE_BOOK_MARK_ROOMS, payload: obj })

//#3. 방 이미지 클릭
export const roomImgClick = (imgURL) => ({ type: ROOM_IMAGE_CLICK, payload: imgURL })
export const modalViewClick = () => ({ type: MODAL_VIEW_CLICK, payload: false })

//#4. 방 관련 JSON 데이터 받아오기
export const requestRooms = () => (dispatch, getState) => {
	if(!getState().requestRooms.isPending){
		dispatch({ type: REQUEST_ROOMS_PENDING })
		apiCall('https://s3.ap-northeast-2.amazonaws.com/bucketplace-coding-test/feed/page_'+(getState().requestRooms.page+1)+'.json')
		.then(date => dispatch({ type: REQUEST_ROOMS_SUCCESS, payload: date }))
		.catch(error => dispatch({ type: REQUEST_ROOMS_FAILED, payload: error }))
	}
}

export const requestRoomsAsync = () => (dispatch, getState) => {
	
	if(!getState().requestRooms.isPending && !getState().requestRooms.error){
		dispatch({ type: REQUEST_ROOMS_PENDING })
		setTimeout( () => {			
			apiCall('https://s3.ap-northeast-2.amazonaws.com/bucketplace-coding-test/feed/page_'+(getState().requestRooms.page+1)+'.json')
			.then(date => dispatch({ type: REQUEST_ROOMS_SUCCESS, payload: date }))
			.catch(error => dispatch({ type: REQUEST_ROOMS_FAILED, payload: error }))	
		}, 1500)		
	}	
}

//#5. 북마크 알림창 
export const addBookMarkAlert = (obj) => (dispatch,getState) => {
	getState().bookMarkAlerts.alerts.length >= 2 ?
	dispatch({ type: ADJUST_BOOK_MARK_ALERT, payload: obj }) :
	dispatch({ type: ADD_BOOK_MARK_ALERT, payload: obj });
}
export const adjustBookMarkAlert = (id) => ({ type: ADJUST_BOOK_MARK_ALERT, payload: id })
export const removeBookMarkAlert = (id) => ({ type: REMOVE_BOOK_MARK_ALERT, payload: id })
export const forceRemoveBookMarkAlert = (id) => ({ type: FORCE_REMOVE_BOOK_MARK_ALERT, payload: id })
export const removeBookMarkAlertAsync = (id) => (dispatch) => {
	setTimeout(() => { dispatch({ type: REMOVE_BOOK_MARK_ALERT, payload: id}) }, BOOK_MARK_ALERT_VIEW_TIME)
}
export const mouseOverBookMarkAlert = (obj,index) => (dispatch,getState) =>{
	const onCnt = getState().bookMarkAlerts.alerts[index].onMouseCnt + 1;
	dispatch({ type: MOUSE_OVER_BOOK_MARK_ALERT, payload: { ...obj, onMouseCnt: onCnt } })
} 
export const mouseOutBookMarkAlert = (obj) => (dispatch) => {
	setTimeout( () => { dispatch({ type: MOUSE_OUT_BOOK_MARK_ALERT, payload: obj}) }, BOOK_MARK_ALERT_VIEW_TIME );
}

/*
export const updateStatusBookMarkAlertAsync = (obj) => (dispatch,getState) => {
	setTimeout(() => { 
		const outCnt = getState().bookMarkAlerts.alerts[index].outMouseCnt + 1;
		dispatch({ type: UPDATE_STATUS_BOOK_MAKR_ALERT, payload: {...obj, outMouseCnt: outCnt }}) }, BOOK_MARK_ALERT_VIEW_TIME)	
}
*/
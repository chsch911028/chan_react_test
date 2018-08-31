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
} from './constants';


//#1. 카테고리별 방 보여주기
const initialStateFilter = {
	filterValue: ''
}

export const filterRooms = (state=initialStateFilter, action={}) => {
	switch(action.type){
		case CHANGE_FILTER_VALUE:
			return Object.assign({}, state, {filterValue: action.payload})
		default:
			return state;
	}
}

//#2. 북마크된 view/방 변경하기
const initailStateBookmark = {
	isBookMarkView : false,
	bookMarkedIds : Object.keys(localStorage)
}


export const bookmarkRooms = (state=initailStateBookmark, action={}) => {
	switch(action.type){
		case CHANGE_BOOK_MARK_ROOMS:
			return Object.assign({}, state, {bookMarkedIds: action.payload.Ids})
		case CHANGE_BOOK_MARK_VEIW:
			return Object.assign({}, state, {isBookMarkView: action.payload})
		default:
			return state;
	}
}

//#3. 방 이미지 클릭
const initailStateRoomView = {
	roomImageClicked: false,
	roomImageId: ''
}

export const viewRooms = (state=initailStateRoomView, action={}) => {
	switch(action.type){
		case ROOM_IMAGE_CLICK:
			return Object.assign({}, state, {roomImageClicked: true, roomImageId: action.payload})
		case MODAL_VIEW_CLICK:
			return Object.assign({}, state, {roomImageClicked: action.payload, roomImageId: ''})
		default:
			return state;
	}
}

//#4. 방 관련 JSON 데이터 받아오기
const initailStateRooms = {
	rooms: [],
	page : 0,
	isPending: false,
}

export const requestRooms = (state=initailStateRooms, action={}) => {
	switch(action.type){
		case REQUEST_ROOMS_PENDING:
			return Object.assign({}, state, {isPending: true, page: state.page})
		case REQUEST_ROOMS_SUCCESS:
			return Object.assign({}, state, { rooms : [ ...state.rooms, ...action.payload ], page: state.page + 1, isPending: false})
		case REQUEST_ROOMS_FAILED:
			return Object.assign({}, state, {error: action.payload, isPending: false, page: state.page})
		default:
			return state;
	}
}


//#5. 북마크 알림창 
const initialStateBoomMarkAlerts = {
	alerts: []
}

export const bookMarkAlerts = (state=initialStateBoomMarkAlerts, action={}) => {
	switch(action.type){
		case ADD_BOOK_MARK_ALERT:
			return { ...state, alerts: [ ...state.alerts.filter( obj => obj.id !== action.payload.id ), action.payload ] }
		case REMOVE_BOOK_MARK_ALERT:
			return { ...state, alerts: [ ...state.alerts.filter( obj => (obj.onMouseCnt > obj.outMouseCnt) || (obj.status === 'disable') || (obj.id !== action.payload) ) ] }
		case FORCE_REMOVE_BOOK_MARK_ALERT:
			return { ...state, alerts: [ ...state.alerts.filter( obj => obj.id !== action.payload ) ] }
		case ADJUST_BOOK_MARK_ALERT:
			return { ...state, alerts: [ ...state.alerts.slice(1), action.payload ] };
		case MOUSE_OVER_BOOK_MARK_ALERT :
			return { ...state, alerts: [ ...state.alerts.map( obj => { 
								if(obj.id === action.payload.id){
									return { ...obj, ...action.payload }
								}else{
									return obj 
								} 
							}) ] }
		case MOUSE_OUT_BOOK_MARK_ALERT:
			return { ...state, alerts: [ ...state.alerts.map( obj => { 
								if(obj.id === action.payload.id){
									return { ...obj, ...action.payload, outMouseCnt: obj.outMouseCnt + 1 }
								}else{
									return obj 
								} 
							}) ] }
		case UPDATE_STATUS_BOOK_MAKR_ALERT:
			return { ...state, alerts: [ ...state.alerts.map( obj => { 
								if(obj.id === action.payload.id){
									return { ...obj, ...action.payload }
								} else{
									return obj;
								}   
							}) ] };			
		default: 
			return state;
	}
}


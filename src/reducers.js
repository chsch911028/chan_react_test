import {
	CHANGE_FILTER_VALUE,

	CHANGE_BOOK_MARK_ROOMS,
	CHANGE_BOOK_MARK_VEIW,

	ROOM_IMAGE_CLICK,

	REQUEST_ROOMS_PENDING,
	REQUEST_ROOMS_SUCCESS,
	REQUEST_ROOMS_FAILED
} from './constants';

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

const initailStateBookmark = {
	isBookMarkView : false,
	bookMarkedIds : Object.keys(localStorage)
}


export const bookmarkRooms = (state=initailStateBookmark, action={}) => {
	switch(action.type){
		case CHANGE_BOOK_MARK_ROOMS:
			return Object.assign({}, state, {bookMarkedIds: action.payload})
		case CHANGE_BOOK_MARK_VEIW:
			return Object.assign({}, state, {isBookMarkView: action.payload})
		default:
			return state;
	}
}


const initailStateRoomView = {
	roomImageClicked: false,
	roomImageId: ''
}

export const viewRooms = (state=initailStateRoomView, action={}) => {
	switch(action.type){
		case ROOM_IMAGE_CLICK:
			return Object.assign({}, state, {roomImageClicked: true, roomImageId: action.payload})
		default:
			return state;
	}
}

const initailStateRooms = {
	rooms: [],
	isPending: true
}

export const requestRooms = (state=initailStateRooms, action={}) => {
	switch(action.type){
		case REQUEST_ROOMS_PENDING:
			return Object.assign({}, state, {isPending: true})
		case REQUEST_ROOMS_SUCCESS:
			return Object.assign({}, state, {rooms: action.payload, isPending: false})
		case REQUEST_ROOMS_FAILED:
			return Object.assign({}, state, {error: action.payload})
		default:
			return state;
	}
}


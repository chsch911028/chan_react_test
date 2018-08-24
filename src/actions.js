import { apiCall } from './api/api';
import {
	CHANGE_FILTER_VALUE,

	CHANGE_BOOK_MARK_ROOMS,
	CHANGE_BOOK_MARK_VEIW,

	ROOM_IMAGE_CLICK,

	REQUEST_ROOMS_PENDING,
	REQUEST_ROOMS_SUCCESS,
	REQUEST_ROOMS_FAILED
} from './constants'

//#1. 카테고리별 방 보여주기
export const setFilterValue = (text) => ({ type: CHANGE_FILTER_VALUE, payload: text })

//#2. 북마크된 view/방 변경하기
export const changeBookMarkView = (bool) => ({ type: CHANGE_BOOK_MARK_VEIW, payload: bool })
export const changeBookMarkedIds = (Ids) => ({ type: CHANGE_BOOK_MARK_ROOMS, payload: Ids })

//#3. 방 이미지 클릭
export const roomImgClick = (imgURL) => ({ type: ROOM_IMAGE_CLICK, payload: imgURL })

//#4. 방 관련 JSON 데이터 받아오기
export const requestRooms = () => (dispatch) => {
	dispatch({ type: REQUEST_ROOMS_PENDING })
	apiCall('https://s3.ap-northeast-2.amazonaws.com/bucketplace-coding-test/feed/page_1.json')
	.then(date => dispatch({ type: REQUEST_ROOMS_SUCCESS, payload: date }))
	.catch(error => dispatch({ type: REQUEST_ROOMS_FAILED, payload: error }))

}


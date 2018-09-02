import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = ({onChangeBookMarkView}) => {
	return (
		<div className='nav_bar'>
      <NavLink exact to='/' className='nav_item' activeClassName='focus'
      			value='false' onClick={onChangeBookMarkView}>전체보기</NavLink>
      <NavLink to='/book-mark' className='nav_item' activeClassName='focus'
            value='true' onClick={onChangeBookMarkView}>북마크</NavLink>
    </div>
	)
}

export default Nav;
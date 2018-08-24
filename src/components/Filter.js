import React from 'react';

const Filter = ({filterValue, onFilterChange}) => {
	return (
		<div className='filter_bar'>
			<span className={ filterValue === '' ? 'filter_item_focus' : 'filter_item' }
					  value='' onClick={onFilterChange}>모두</span>
			<span className={ filterValue === 'Project' ? 'filter_item_focus' : 'filter_item' }
						value='Project' onClick={onFilterChange}>집들이</span>
			<span className={ filterValue === 'Production' ? 'filter_item_focus' : 'filter_item' }
						value='Production' onClick={onFilterChange}>제품</span>
			<span className={ filterValue === 'Card' ? 'filter_item_focus' : 'filter_item' }
						value='Card' onClick={onFilterChange}>사진</span>
			<span className={ filterValue === 'Exhibition' ? 'filter_item_focus' : 'filter_item' }
						value='Exhibition' onClick={onFilterChange}>기획전</span>
		</div>
	)
}

export default Filter;
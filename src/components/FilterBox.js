import React from 'react';
import Filter from './Filter';

const FilterBox = ({filterValue, onFilterChange}) => {
	return (
		<Filter filterValue={filterValue} onFilterChange={onFilterChange} />
	)
}

export default FilterBox;


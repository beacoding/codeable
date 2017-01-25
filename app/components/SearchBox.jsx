const React = require('react');

const SearchBox = ({handleSearchChange}) => {

	return (
		<div>
			<input 
        className="form-control" 
        type="text" 
        placeholder="Search Youtube Videos"
        onChange={handleSearchChange.bind(this)}/>
		</div>
	)
}

module.exports = SearchBox;
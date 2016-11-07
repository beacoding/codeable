const React = require('react');

const SearchBox = ({handleSearchChange}) => {

	return (
		<div>
			<input className="form-control" type="text" onChange={handleSearchChange.bind(this)}/>
		</div>

	)
}

module.exports = SearchBox;
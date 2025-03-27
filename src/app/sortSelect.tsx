

export default function SortSelect({setSortOrder}) {
	function sortSelectHandler(e) {
		e.preventDefault();
		setSortOrder(e.target.value);
	}

	return (
		<div>
			<h4>Breed Sort Order</h4>
			<select defaultValue='breed:asc' onInput={sortSelectHandler}>
				<option value='breed:asc'>Alphabetical By Breed</option>
				<option value='breed:desc'>Reverse Alphabetical By Breed</option>
				<option value='name:asc'>Alphabetical By Name</option>
				<option value='name:desc'>Reverse Alphabetical By Name</option>
				<option value='age:asc'>Age: Low to High</option>
				<option value='age:desc'>Age: High to Low</option>
			</select>
		</div>
	)
}
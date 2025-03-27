export default function NavigationButtons({previous, next, findMatch}) {
	return (
	  <div>
	    { previous ? <button onClick={previous} style={{float: 'left'}}>Previous</button> : null }
	    <button onClick={findMatch} style={{display: 'table', margin: '0 auto'}}>Find Match!</button>
	    { next ? <button onClick={next} style={{float: 'right', marginTop: '-20px'}}>Next</button> : null }
	  </div>
	)
}
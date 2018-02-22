import React from 'react';

class Error extends React.Component {
	constructor(props) {
		super(props);
	}
	render(){
	    return (
	    	<div className="searchError">{this.props.errorText}</div>
	    )
  }
}

export default Error
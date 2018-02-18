import React from 'react';

class Error extends React.Component {
	constructor(props) {
		super(props);
	}
	render(){
	    return (
	    	<div>{this.props.errorText}</div>
	    )
  }
}

export default Error
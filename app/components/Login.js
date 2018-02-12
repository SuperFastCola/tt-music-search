import React from 'react';
import $ from 'jquery';
 
class Login extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		console.log(this.props)
	}
	componentDidCatch(error, info) {
		console.log(error)
		console.log(info)
	}
	render() {
	    return (
	    	<div>
	    	<p>Please Login To Spotify to use use the Web API</p>
	    	<a href={this.props.auth}>Login</a>
	    	</div>
	    )
  }
}

export {Login}

import React from 'react';
import $ from 'jquery';
import {connect} from 'react-redux';
 
class Login extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		
	}
	componentDidCatch(error, info) {
		console.log(error)
		console.log(info)
	}
	render() {
	    return (
	    	<div>
	    	<p>Please Login To Spotify to use use the Web API</p>
	    	<a href={this.props.info.auth.fullurl}>Login</a>
	    	</div>
	    )
  }
}


const mapStateToProps = function(state){
	return {"info":state};		
}

 const mapDispatchToProps = function(dispatch) {
    return({
        setTheToken: (token) => {
        	dispatch({type:"SET_TOKEN","token":token})
        },
        errorAlert: () => {
        	dispatch({type:"ALL"})
        }
    })
}


export default connect(mapStateToProps,mapDispatchToProps)(Login)

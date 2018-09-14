import React from 'react';
import $ from 'jquery';
import {connect} from 'react-redux';
 
class Login extends React.Component {
	constructor(props) {
		super(props);
		this.goToSpotify = this.goToSpotify.bind(this);
	}
	componentDidMount() {
		
	}
	componentDidCatch(error, info) {
		console.log(error)
		console.log(info)
	}
	goToSpotify(e){
		window.location = this.props.info.auth.fullurl;
	}
	tryAgain(e){
		window.location = "/";
	}
	showNormalLogin(){
  		return (
	    	<div className="login-area">
	    	<h1>Logging into Spotify to use the Web API</h1>
	    	</div>
	    )
	}
	showErrorLogin(){
		return (
	    	<div className="login-area">
	    	<h1>There seems to be an error with logging in</h1>
	    	<button onClick={this.goToSpotify}>Login</button>
	    	<button onClick={this.tryAgain}>Try Again</button>
	    	</div>
	    )
	}
	render() {
		const ajaxError = this.props.info.error;		
	   
		if(ajaxError != null){
			return this.showErrorLogin();
		}
		else{
			return this.showNormalLogin();
		}
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

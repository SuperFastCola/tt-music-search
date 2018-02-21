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
	render() {
	    return (
	    	<div className="login-area">
	    	<h1>Please Login To Spotify to use use the Web API</h1>
	    		<button onClick={this.goToSpotify}>Login</button>
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

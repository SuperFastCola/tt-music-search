import React from 'react';
import $ from 'jquery';
import Login from './Login';
import Search from './Search';
import { createStore } from "redux";
import {connect} from 'react-redux';
import rootReducer from "../reducers/Spotify";
import setToken from "../actions";
 
class App extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.parseToken();
	}
	parseToken(){
		//parse the token from attachedto the callback url after Spotify Login
		let token = String(window.location.href).match(/access_token=(.*)&token_type/);
		if(token != null){
			this.props.setTheToken(token[1]);
		}	
	}
	showLogin(){
		return (
			<div>
	    	<Login />
	    	</div>
	    )
	}
	showApp(){
		return (
	    	<div className="search-area">
	    	<Search/>
	    	</div>
	    )
	}
	render() {
	    if(this.props.info.token!=null && this.props.info.error==null){
	    	return this.showApp()
	    }
	    else{
	    	return this.showLogin()
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


export default connect(mapStateToProps,mapDispatchToProps)(App)

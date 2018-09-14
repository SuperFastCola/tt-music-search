import React from 'react';
import $ from 'jquery';
import Login from './Login';
import Search from './Search';
import { createStore } from "redux";
import {connect} from 'react-redux';
import rootReducer from "../reducers/Spotify";
import setToken from "../actions";
import {sendAjaxRequest} from "../modules/sendAjaxRequest";

 
class App extends React.Component {
	constructor(props) {
		super(props);
		this.parseToken = this.parseToken.bind(this);
		this.ajaxError = this.ajaxError.bind(this);
	}
	componentDidMount() {
		if(!this.parseTokenFromURL()){
			sendAjaxRequest(this.props.info.auth.token_path,null,this.parseToken,this.ajaxError);
		}
	}

	parseTokenFromURL(){
		let token = String(window.location.href).match(/access_token=(.*)&token_type/);
		if(token != null){
			this.props.setTheToken(token[1]);
			return true;
     	}
     	return false;
	}

	parseToken(output){
		if(output.entry){
			this.props.setTheToken(output.entry);
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
	ajaxError(jqXHR, textStatus){
		this.props.setAjaxError(textStatus);
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
        },
        setAjaxError: (error) => {
        	console.log("---",error);
        	dispatch({type:"SET_AJAX_ERROR","error":error})
        }
    })
}


export default connect(mapStateToProps,mapDispatchToProps)(App)

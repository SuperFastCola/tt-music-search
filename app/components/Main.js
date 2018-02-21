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

class HelloMessage extends React.Component {
  render() {
    return <div>Hi {this.props.name}!</div>;
  }
};

class Hey extends React.Component {
  render() {
    return <div>Hey {this.props.name}!</div>;
  }
};

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

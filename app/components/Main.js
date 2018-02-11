import React from 'react';
import $ from 'jquery';
import Login from './Login';
import {connect} from 'react-redux';
import { createStore } from "redux";
 
class App extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		console.log(this.props);
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
	    	<div>
	    	<HelloMessage name={this.props.name}/>
	    	<Hey  name={this.props.name}/>
	    	</div>
	    )
	}
	render() {
		console.log("main");
		console.log(this.props);
	    if(this.props.token!=null){
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
	console.log("Main");
	console.log(state);
	return state;	
}

export default connect(mapStateToProps)(App)

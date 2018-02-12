import React from 'react';
import $ from 'jquery';
import {Login} from './Login';
 
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			token:this.props.token,
			auth: this.props.auth
		}
	}
	componentDidMount() {
		this.parseToken();
	}
	componentDidCatch(error, info) {
		console.log(error)
		console.log(info)
	}
	parseToken(){
		let token = String(window.location.href).match(/access_token=(.*)&token_type/);
		if(token != null){
			this.setState({token:token[1]});
		}	
	}
	showLogin(){
		return (
			<div>
	    	<Login auth={this.props.auth}/>
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
	    if(this.state.token!=null){
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

export {App}

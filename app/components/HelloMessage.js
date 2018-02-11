import React from 'react';
import $ from 'jquery';
import {Login} from './Login';
 
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hastoken:null
		};
	}
	componentDidMount() {
		
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
	    if(this.state.hastoken!=null){
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


export {App};

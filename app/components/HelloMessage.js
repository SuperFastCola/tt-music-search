import React from 'react';
import $ from 'jquery';
 
class App extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
	    return (
	    	<div>
	    	<HelloMessage name={this.props.name}/>
	    	<Hey  name={this.props.name}/>
	    	</div>
	    )
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

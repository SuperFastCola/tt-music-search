import React from 'react';
import $ from 'jquery';
 
class Login extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		
	}
	startLogin(e){
		e.preventDefault();
		var user = $("input[name=username]").val();
		var pass = $("input[name=password]").val();
	}
	render() {
	    return (
	    	<div>
	    	<form>
	    		<input name="username" type="text"/>
	    		<input name="password" type="password"/>
	    		<input type="submit" onClick={this.startLogin}/>
	    	</form>
	    	</div>
	    )
  }
}
export {Login};

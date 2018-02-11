import React from 'react';
import $ from 'jquery';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import rootReducer from "../reducers/Spotify";
import setToken from "../actions";
 
class Login extends React.Component {
	constructor(props) {
		super(props);
		this.startLogin = this.startLogin.bind(this);
	}
	componentDidMount() {
		
	}
	changdData(){
		console.log(this);
	}
	startLogin(e){
		e.preventDefault();
		var user = $("input[name=username]").val();
		var pass = $("input[name=password]").val();		
		this.props.sendTheAlert("dhsjkadhjsadjhjhd");
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


const mapStateToProps = function(state){
	return {"info":state};		
}

function mapDispatchToProps(dispatch) {
    return({
        sendTheAlert: (token) => {
        	dispatch({type:"SET_TOKEN","token":token})
        },
        errorAlert: () => {
        	dispatch({type:"ALL"})
        }
    })
}


export default connect(mapStateToProps,mapDispatchToProps)(Login)

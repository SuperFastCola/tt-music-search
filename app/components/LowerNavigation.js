import React from 'react';
import {connect} from 'react-redux';
import NextPrevButton from "./NextPrevButton";

class LowerNavigation extends React.Component {
	constructor(props) {
		super(props);
	}

	render(){
	    return (
	    	<div>
	    	Lower Nave
	    	</div>
	    )
  }
}

const mapStateToProps = function(state){
	return {"info":state};		
}

export default connect(mapStateToProps)(LowerNavigation)
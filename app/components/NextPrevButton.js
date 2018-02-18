import React from 'react';
import $ from 'jquery';
import {connect} from 'react-redux';
import rootReducer from "../reducers/Spotify";
import generalActions from "../actions";
import {sendAjaxRequest} from "../modules/sendAjaxRequest";

class NextPrevButton extends React.Component {
	constructor(props) {
		super(props);
		this.ajaxError = this.ajaxError.bind(this);
		this.setListingData = this.setListingData.bind(this);
		this.getAnotherSet = this.getAnotherSet.bind(this);
	}
	setListingData(output){
		this.props.setAjaxError(null);
		this.props.setResults(output);

	}
	ajaxError(jqXHR, textStatus){
		console.log(jqXHR)
		console.log(textStatus)
		this.props.setAjaxError(jqXHR.responseJSON);
	}
	getAnotherSet(e){
		e.preventDefault();
		let url = $(e.currentTarget).attr("data-action-url");
		sendAjaxRequest(url,this.props.info.token,this.setListingData,this.ajaxError);	
	}
	render(){
	    return (
	    	<div>
	    		<a data-action-url={this.props.url} className="next-button" onClick={this.getAnotherSet}>{this.props.text}</a>
	    	</div>
	    )
  }
}

const mapStateToProps = function(state){
	return {"info":state};		
}

 const mapDispatchToProps = function(dispatch) {
    return({
        setResults: (results) => {
        	dispatch({type:"SET_RESULTS","results":results})
        },
        setAjaxError: (error) => {
        	dispatch({type:"SET_AJAX_ERROR","error":error})
        }
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(NextPrevButton)
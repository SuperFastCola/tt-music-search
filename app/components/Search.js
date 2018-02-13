import React from 'react';
import $ from 'jquery';
import {connect} from 'react-redux';
import rootReducer from "../reducers/Spotify";
import setResults from "../actions";
import ArtistList from "./ArtistList";

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.startSearch = this.startSearch.bind(this);
		this.ajaxError = this.ajaxError.bind(this);
		this.setHeaderForAjax = this.setHeaderForAjax.bind(this)
		this.setListingData = this.setListingData.bind(this)
		this.sendAjaxRequest = this.sendAjaxRequest.bind(this)

		console.log()
	}
	componentDidMount() {
	}
	componentDidCatch(error, info) {
	}
	setListingData(output){
		this.props.setResults(output);
	}
	ajaxError(jqXHR, textStatus){
		console.log(jqXHR)
		console.log(textStatus)
	}
	sendAjaxRequest(url,resultFunction){
		var request = $.ajax({
			url: url,
			method: "GET",
			dataType: "json",
			beforeSend: this.setHeaderForAjax
		});
		request.done(resultFunction);
		request.fail(this.ajaxError);
	}
	setHeaderForAjax(xhr){
		xhr.setRequestHeader("Authorization", "Bearer " + this.props.info.token );
	}
	startSearch(e){
		e.preventDefault();
		var search_string = String($("input[name=query]").val()).replace(/\s/g,"%20");
		var search_url = this.props.info.search.url + search_string + this.props.info.search.param + this.props.info.search.subject;
		this.sendAjaxRequest(search_url,this.setListingData);
	}
	render() {
		var listing = null;
		switch(this.props.info.category){
			case 'artists':
				listing = <ArtistList/>
			break;
		}
	    return (
	    	<div>
	    	<p>Search Artists</p>
	    	<form className="search_form">
	    		<input type="text" name="query" placeholder="Enter Your Query" />
	    		<button type="sumit" onClick={this.startSearch}>Start</button>
	    	</form>
	    	 { this.props.info.results != null && 
	    	 	listing
	    	 }
	    	 
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
        }
    })
}


export default connect(mapStateToProps,mapDispatchToProps)(Search)


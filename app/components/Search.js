import React from 'react';
import $ from 'jquery';
import {connect} from 'react-redux';
import rootReducer from "../reducers/Spotify";
import generalActions from "../actions";
import ArtistList from "./ArtistList";
import AlbumList from "./AlbumList";
import {sendAjaxRequest} from "../modules/sendAjaxRequest";

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.startSearch = this.startSearch.bind(this);
		this.ajaxError = this.ajaxError.bind(this);
		this.setListingData = this.setListingData.bind(this)

		console.log()
	}
	componentDidMount() {
	}
	componentDidCatch(error, info) {
	}
	setListingData(output){
		console.log(output);
		this.props.setAjaxError(null);
		this.props.setResults(output);
	}
	ajaxError(jqXHR, textStatus){
		console.log(jqXHR)
		console.log(textStatus)
		this.props.setAjaxError(jqXHR.responseJSON);
	}
	startSearch(e){
		e.preventDefault();
		var search_string = String($("input[name=query]").val()).replace(/\s/g,"%20");
		var search_url = this.props.info.search.url + search_string + this.props.info.search.param + this.props.info.search.subject;
		sendAjaxRequest(search_url,this.props.info.token,this.setListingData,this.ajaxError);
	}
	render() {
		var listing = null;

		switch(this.props.info.category){
			case 'artists':
				listing = <ArtistList/>
				break;
			case 'albums':
				listing = <AlbumList/>
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
        },
        setAjaxError: (error) => {
        	dispatch({type:"SET_AJAX_ERROR","error":error})
        }
    })
}



export default connect(mapStateToProps,mapDispatchToProps)(Search)


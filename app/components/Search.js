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
		this.state = {
			search:true
		}
		this.startSearch = this.startSearch.bind(this);
		this.ajaxError = this.ajaxError.bind(this);
		this.setListingData = this.setListingData.bind(this)
		this.showSearch = this.showSearch.bind(this)
		this.showNewRelease = this.showNewRelease.bind(this)
		this.setNewReleasesData = this.setNewReleasesData.bind(this)

	}
	componentDidMount() {
		this.showNewRelease()
	}
	componentDidCatch(error, info) {
	}
	setListingData(output){
		this.props.setAjaxError(null);
		this.props.setResults(output);
	}
	setNewReleasesData(output){
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
		this.props.setCategory("artists");
		this.props.setArtist(null);
		var search_string = String($("input[name=query]").val()).replace(/\s/g,"%20");
		var search_url = this.props.info.search.url + search_string + this.props.info.search.param + this.props.info.search.subject;
		sendAjaxRequest(search_url,this.props.info.token,this.setListingData,this.ajaxError);
	}
	showNewRelease(){
		var new_releases_url = this.props.info.spotify_base + this.props.info.new_releases_path;
		sendAjaxRequest(new_releases_url,this.props.info.token,this.setNewReleasesData,this.ajaxError);
	}
	showSearch(){
		this.props.setArtist(null);
	}
	showArtistName(){
		return (
			<div>
			<button onClick={this.showSearch}>Search</button>
	    	Artist {this.props.info.selected_artist.name}
	    	</div>
		)
	}
	searchArea(){		
		return (
			<div>
	    	<p>Search Artists</p>
	    	<form className="search_form">
	    		<input type="text" name="query" placeholder="Enter Your Query" />
	    		<button type="sumit" onClick={this.startSearch}>Start</button>
	    	</form>
	    	</div>
		)
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
			case 'newreleases':
				listing = <AlbumList/>
				break;
		}


	    return (
	    	<div>
	    	{ this.props.info.selected_artist == null && this.searchArea() }
	    	{ this.props.info.selected_artist != null && this.showArtistName() }
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
        setArtist: (artist_obj) => {
        	dispatch({type:"SET_ARTIST","artist":artist_obj})
        },
        setCategory: (category) => {
        	dispatch({type:"SET_SEARCH_CATEGORY","category":category})
        },
        setAjaxError: (error) => {
        	dispatch({type:"SET_AJAX_ERROR","error":error})
        }
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(Search)


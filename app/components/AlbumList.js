import React from 'react';
import $ from 'jquery';
import {connect} from 'react-redux';
import rootReducer from "../reducers/Spotify";
import Album from "./Album";
import generalActions from "../actions";
import {sendAjaxRequest} from "../modules/sendAjaxRequest";

class AlbumList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			"success":false,
			"showAlbums": false
		}
		this.chooseArtist = this.chooseArtist.bind(this)
		this.startSearch = this.startSearch.bind(this);
		this.setListingData = this.setListingData.bind(this)
		this.ajaxError = this.ajaxError.bind(this)
	}
	ajaxError(jqXHR, textStatus){
		console.log(jqXHR)
		console.log(textStatus)
		this.props.setAjaxError(jqXHR.responseJSON);
	}
	chooseArtist(e){
		e.preventDefault()
		let spot_id = this.props.info.results.artists.items[this.props.id].id;
		this.props.setArtist(this.props.info.results.artists.items[this.props.id]);
		this.props.setCategory("albums");
		this.startSearch(spot_id)
	}
	setListingData(output){
		this.setState({"success":true});
		this.props.setAjaxError(null);
		this.props.setResults(output);
	}
	startSearch(spot_id){
		let url =  `${this.props.info.spotify_base}/artists/${spot_id}/albums`;
		sendAjaxRequest(url,this.props.info.token,this.setListingData,this.ajaxError);
	}
	render() {
		let target = null;
		if(typeof this.props.info.results != "undefined"){
			target = this.props.info.results.items;
		}
		else{
			target = this.props.info.results.items;
		}
		
	    return (
	    	<div className="artist_listing">
	    		{typeof target != "undefined" &&
	    		 	target.map((artist,index) => 
						(<Album key={index} id={index}/>)
					)
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
export default connect(mapStateToProps,mapDispatchToProps)(AlbumList)

import React from 'react';
import $ from 'jquery';
import {connect} from 'react-redux';
import marked from "marked";
import rootReducer from "../reducers/Spotify";
import generalActions from "../actions";
import {sendAjaxRequest} from "../modules/sendAjaxRequest";

class NextPrevButton extends React.Component {
	constructor(props) {
		super(props);
		this.ajaxError = this.ajaxError.bind(this);
		this.setListingData = this.setListingData.bind(this);
		this.getAnotherSet = this.getAnotherSet.bind(this);
		this.getAlbumsDetails = this.getAlbumsDetails.bind(this)
		this.addAlbumDetailsToResults = this.addAlbumDetailsToResults.bind(this)
	}
	setListingData(output){
		this.props.setAjaxError(null);
		this.props.setResults(output);
		 $(window).scrollTop(0);

		console.log(this.props.info.category);

		if(this.props.info.category.match(/albums|newreleases/)){
			this.getAlbumsDetails(output);	
		}

	}
	addAlbumDetailsToResults(output){
		this.props.setAjaxError(null);
		this.props.addAlbumDetails(output);
	}
	getAlbumsDetails(output){
		var album_ids = "";
		var target = (typeof output.albums != "undefined")?output.albums.items:output.items;


		target.map((album,index)=>{
			album_ids += album.id + ((index<(target.length-1))?",":"");
		});
		let url =  `${this.props.info.spotify_base}/albums?ids=${album_ids}`;
		sendAjaxRequest(url,this.props.info.token,this.addAlbumDetailsToResults,this.ajaxError);
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
	setArrowIcon(text){
		let arrow_left = "&#9664;";
		let arrow_right = "&#9658;";
		let arrow = arrow_right;

		if(text.match(/prev/i)){
			arrow = arrow_left;
		}

		let icon = marked(arrow, {sanitize: false});
    	return { __html: icon };
		
	}
	render(){
		var arrow_class = "next-button";
		if(this.props.text.match(/previous/i)){
			arrow_class = "prev-button";
		}

	    return (
	    	<div>
	    		<button data-action-url={this.props.url} className={arrow_class} onClick={this.getAnotherSet} dangerouslySetInnerHTML={this.setArrowIcon(this.props.text)}></button>
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
        addAlbumDetails: (results) => {
        	dispatch({type:"ADD_ALBUM_DETAILS","results":results})
        },
        setAjaxError: (error) => {
        	dispatch({type:"SET_AJAX_ERROR","error":error})
        }
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(NextPrevButton)
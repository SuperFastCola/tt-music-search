import React from 'react';
import $ from 'jquery';
import {connect} from 'react-redux';
import rootReducer from "../reducers/Spotify";
import setResults from "../actions";
import {sendAjaxRequest} from "../modules/sendAjaxRequest";

class Artist extends React.Component {
	constructor(props) {
		super(props);
		this.chooseArtist = this.chooseArtist.bind(this)
		this.startSearch = this.startSearch.bind(this);
		this.setListingData = this.setListingData.bind(this)
		this.ajaxError = this.ajaxError.bind(this)
	}
	chooseArtist(e){
		e.preventDefault()
		let spot_id = this.props.info.results.artists.items[this.props.id].id;
		this.props.setArtist(this.props.info.results.artists.items[this.props.id]);
		this.props.setCategory("albums");
		this.startSearch(spot_id)
	}
	ajaxError(jqXHR, textStatus){
		console.log(jqXHR)
		console.log(textStatus)
		this.props.setAjaxError(jqXHR.responseJSON);
	}
	setListingData(output){
		console.log(output);
		this.props.setAjaxError(null);
		this.props.setResults(output);
	}
	startSearch(spot_id){
		let url =  `${this.props.info.spotify_base}/artists/${spot_id}/albums`;
		sendAjaxRequest(url,this.props.info.token,this.setListingData,this.ajaxError);
	}
	render() {
		let target = this.props.info.results.artists.items[this.props.id];
		let image = target.images.filter(img=>(img.width>=150 && img.width<=350));
		let style ={};
		let noPhoto = "";
		if(image.length>0){
			style.backgroundImage = 'url(' + image[0].url  + ')';	
		}
		else{
			noPhoto = "none"
		}
		
	    return (
	    	<div className="artist_row" data-spot-id={target.id} onClick={this.chooseArtist}>
				<div className={`artist_photo ${noPhoto}`} style={style}></div>
	    		<span className="artist_name">{target.name}</span>
	    	</div>
	    )
  }
}

const mapStateToProps = function(state){
	return {"info":state};		
}
 const mapDispatchToProps = function(dispatch) {
    return({
        setArtist: (artist_obj) => {
        	dispatch({type:"SET_ARTIST","artist":artist_obj})
        },
        setCategory: (category) => {
        	dispatch({type:"SET_SEARCH_CATEGORY","category":category})
        },
        setResults: (results) => {
        	dispatch({type:"SET_RESULTS","results":results})
        },
        setAjaxError: (error) => {
        	dispatch({type:"SET_AJAX_ERROR","error":error})
        }

    })
}
export default connect(mapStateToProps,mapDispatchToProps)(Artist)
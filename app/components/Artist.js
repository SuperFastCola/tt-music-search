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
		this.getAlbumsDetails = this.getAlbumsDetails.bind(this)
		this.addAlbumDetailsToResults = this.addAlbumDetailsToResults.bind(this)
	}
	chooseArtist(e){
		e.preventDefault()
		let spot_id = this.props.info.results.items[this.props.id].id;
		this.props.setArtist(this.props.info.results.items[this.props.id]);
		this.props.setCategory("albums");
		this.startSearch(spot_id)
	}
	ajaxError(jqXHR, textStatus){
		console.log(jqXHR)
		console.log(textStatus)
		this.props.setAjaxError(jqXHR.responseJSON);
	}
	addAlbumDetailsToResults(output){
		this.props.setAjaxError(null);
		this.props.addAlbumDetails(output);
	}
	getAlbumsDetails(output){
		var album_ids = "";
		output.items.map((album,index)=>{
			album_ids += album.id + ((index<(output.items.length-1))?",":"");
		});

		let url =  `${this.props.info.spotify_base}/albums?ids=${album_ids}`;
		sendAjaxRequest(url,this.props.info.token,this.addAlbumDetailsToResults,this.ajaxError);
	}

	setListingData(output){
		this.props.setAjaxError(null);
		this.props.setResults(output);
		this.getAlbumsDetails(output);

	}
	startSearch(spot_id){
		let url =  `${this.props.info.spotify_base}/artists/${spot_id}/albums?album_type=album,single`;
		sendAjaxRequest(url,this.props.info.token,this.setListingData,this.ajaxError);
	}
	render() {
		var target = this.props.info.results.items[this.props.id];
		var image = [];
		var style ={};
		var noPhoto = "";

		if(target != null){
			if(typeof target.images !="undefined" && typeof target != "undefined"){
				image = target.images.filter(img=>(img.width>=150 && img.width<=350));
			}
			
			if(image.length>0){
				style.backgroundImage = 'url(' + image[0].url  + ')';	
			}
			else{
				noPhoto = "none"
			}
		}
		
		if(target != null){
			return (
		    	<div className="artist_row" data-spot-id={target.id} onClick={this.chooseArtist}>
					<div className={`artist_photo ${noPhoto}`} style={style}></div>
		    		<span className="artist_name">{target.name}</span>
		    	</div>
	    	)	
		}
		else{
			return (
				<div>Nada</div>
			)
		}
	    
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
        addAlbumDetails: (results) => {
        	dispatch({type:"ADD_ALBUM_DETAILS","results":results})
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
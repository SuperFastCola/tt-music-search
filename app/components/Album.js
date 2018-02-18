import React from 'react';
import $ from 'jquery';
import {connect} from 'react-redux';
import rootReducer from "../reducers/Spotify";
import setResults from "../actions";
import {sendAjaxRequest} from "../modules/sendAjaxRequest";

class Album extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showTracks:false
		}
		this.getTracks = this.getTracks.bind(this)
		this.showTracks = this.showTracks.bind(this)
	}
	getTracks(e){
		var album_id = String($(e.currentTarget).data("spot-id"));
		let url =  `${this.props.info.spotify_base}/albums/${album_id}/tracks?limit=50`;
		sendAjaxRequest(url,this.props.info.token,this.showTracks);
	}
	showTracks(output){
		this.setState({showTracks:true});
		this.props.setTracks(output);
	}
	render(){

		let target = null;
		if(typeof this.props.info.results.albums != "undefined"){
			target = this.props.info.results.albums.items[this.props.id];
		}
		else{
			target = this.props.info.results.items[this.props.id];
		}

		let image = target.images.filter(img=>(img.width>=150 && img.width<=350));
		let style ={};
		let noPhoto = "";
		if(image.length>0){
			style.backgroundImage = 'url(' + image[0].url  + ')';	
		}
		else{
			noPhoto = "none"
		}

		var tracks_loaded = (this.state.showTracks && this.props.info.selected_tracks != null )?true:false;
	    return (
	    	<div className="artist_row album" data-spot-id={target.id} onClick={this.getTracks}>
				<div className={`artist_photo album ${noPhoto}`} style={style}></div>
	    		<span className="artist_name album">{target.name}</span>
				{ tracks_loaded &&
	    			<span>Tracks: {this.props.info.selected_tracks.items.length}</span>
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
        setArtist: (artist_obj) => {
        	dispatch({type:"SET_ARTIST","artist":artist_obj})
        },
        setCategory: (category) => {
        	dispatch({type:"SET_SEARCH_CATEGORY","category":category})
        },
        setResults: (results) => {
        	dispatch({type:"SET_RESULTS","results":results})
        },
        setTracks: (tracks) => {
        	dispatch({type:"SET_TRACKS","tracks":tracks})
        },
        setAjaxError: (error) => {
        	dispatch({type:"SET_AJAX_ERROR","error":error})
        }

    })
}
export default connect(mapStateToProps,mapDispatchToProps)(Album)
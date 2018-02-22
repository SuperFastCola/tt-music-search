import React from 'react';
import $ from 'jquery';
import {connect} from 'react-redux';
import rootReducer from "../reducers/Spotify";
import setResults from "../actions";
import marked from "marked";
import Track from "./Track";
import {sendAjaxRequest} from "../modules/sendAjaxRequest";

class DiscName extends React.Component{
		constructor(props) {
			super(props);

		}
		render(){
			return (
				<h1 key={this.props.unique_key} >Disk {this.props.disc_number}</h1>
			)
			
		}
}

class Album extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showTracks:false,
			tracks:null,
			selectedAlbum: 0
		}
		this.getTracks = this.getTracks.bind(this)
		this.showAlbumTracks = this.showAlbumTracks.bind(this)
		this.displayTracks = this.displayTracks.bind(this)
		this.getAdditionalTracks = this.getAdditionalTracks.bind(this)
		this.hideTracks = this.hideTracks.bind(this)
		this.createReviewsArea = this.createReviewsArea.bind(this)
		this.ajaxError = this.ajaxError.bind(this)
	}
	getTracks(e){
		//$(".artist_row.album").removeClass("selected");
		$(e.currentTarget).parent().addClass("selected");
		let album_id = String($(e.currentTarget).data("spot-id"));
		this.setState({selectedAlbum: album_id});
		let url =  `${this.props.info.spotify_base}/albums/${album_id}/tracks?limit=20`;
		sendAjaxRequest(url,this.props.info.token,this.showAlbumTracks,this.ajaxError);
	}
	hideTracks(e){
		$(e.currentTarget).parent().addClass("selected");
		this.setState({showTracks:false});
	}
	ajaxError(jqXHR, textStatus){
		console.log(jqXHR)
		console.log(textStatus)
		this.props.setAjaxError(jqXHR.responseJSON);
	}
	getAdditionalTracks(e){
		e.stopPropagation();
		$(e.currentTarget).parent().parent().scrollTop(0);
		let url = $(e.currentTarget).attr("data-next-url");
		sendAjaxRequest(url,this.props.info.token,this.showAlbumTracks,this.ajaxError);
	}
	showAlbumTracks(output){
		let new_tracks = Object.assign({},this.state.tracks,output);
		this.setState({showTracks:true,tracks:new_tracks});
	}
	displayTracks(){
		return(
			<div className="tracks-holder">
			{this.state.tracks.items.map(function(track,index){
					var disc_number = null;
					var key_base = new Date().getTime();
					if(track.track_number==1 && track.disc_number != null){
						disc_number = <DiscName key={(track.id + "disc_number" )} unique_key={key_base} disc_number={track.disc_number} />;
					}
					return (<div key={String(index) + "holder"} >{disc_number}<Track key={index} unique_key={track.id} track_id={track.id} track_url={track.href} track_number={track.track_number} name={track.name} /></div>)
				}
			)}
			<div className="tracks-navigation">
				{ this.state.tracks.previous != null &&
					<button className="prev_tracks tracks-paging" data-next-url={this.state.tracks.previous} onClick={this.getAdditionalTracks}>&#9664;</button>
				}
				{ this.state.tracks.next != null &&
					<button className="next_tracks tracks-paging" data-next-url={this.state.tracks.next} onClick={this.getAdditionalTracks}>&#9658;</button>
				}
			</div>
			</div>

		)
	}
	createReviewsArea(rating) {
		var total = rating;
		var html = "";
		var current = 1;
		while(current <= 5){
			if(current<=total){
				html += marked("<span class='review-star filled'>&#9733;</span>", {sanitize: false});
			}
			else{
				html += marked("<span class='review-star'>&#9733;</span>", {sanitize: false});
			}
			current++;
		}

    	return { __html: html };
  	}
  	returnArtistsNames(target){
  		var artists = "";
  		for(var i =0; i<target.artists.length;i++){
  			artists+=target.artists[i].name;
  			if(typeof target.artists[i+1] != "undefined"){
  				artists+=", ";
  			}
  		}
  		return(
  			<div className="name artist-roster">
  				{artists}
  			</div>
  		)
  	}
	render(){
		var target = null;
		if(typeof this.props.info.results != "undefined"){
			target = this.props.info.results.items[this.props.id];
		}

		let image = null;
		let style ={};
		let noPhoto = "";
		let album_year = null;
		let stars = null;
		let tracks_loaded = (this.state.showTracks && this.state.tracks != null )?true:false;


		if(target != null){
			image = target.images.filter(img=>(img.width>=150 && img.width<=350));
			if(image.length>0){
				style.backgroundImage = 'url(' + image[0].url  + ')';	
			}
			else{
				noPhoto = "none"
			}
	
			if(typeof target.release_date != "undefined"){
				album_year = new Date(target.release_date);	
				album_year = album_year.getFullYear();
			}
		
			if(typeof target.popularity != "undefined"){
				stars =  Math.round(Number((Number(target.popularity)/100) * 5));
			}
		}

	    return (
	    	<div className="artist_row album">
	    		{this.state.showTracks==false &&
	    			<button className="show_tracks" onClick={this.getTracks} data-spot-id={target.id} >Show Tracks</button>	
	    		}

	    		{this.state.showTracks==true &&
	    			<button className="hide_tracks" onClick={this.hideTracks}>Hide Tracks</button>	
	    		}
	    		<div className="cover_holder album">
				<div className={`artist_photo ${noPhoto}`} style={style}></div>
					{ (target.id==this.state.selectedAlbum && tracks_loaded ) &&
	    				this.displayTracks()
	    			}
				</div>
	    		<div className="artist_name album">
	    			{ this.props.info.category == "newreleases" &&
	    				this.returnArtistsNames(target)
	    			}
	    			<div className="name">{target.name}</div>
	    			<div className="popularity">
	    				<span className="review"  dangerouslySetInnerHTML={this.createReviewsArea(stars)}></span>
	    				<span className="release_date">{album_year}</span>
	    			</div>
	    		</div>

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
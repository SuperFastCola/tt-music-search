import React from 'react';
import $ from 'jquery';
import {connect} from 'react-redux';
import rootReducer from "../reducers/Spotify";
import setResults from "../actions";
import {sendAjaxRequest} from "../modules/sendAjaxRequest";

class DiscName extends React.Component{
		constructor(props) {
			super(props);
		}
		render(){
			return (
				<span key={this.props.unique_key} >Disk {this.props.disc_number}</span>
			)
			
		}
}

class Track extends React.Component{
		constructor(props) {
			super(props);
		}
		render(){

			return (
				<div key={this.props.unique_key} className="album_track">{this.props.track_number} {this.props.name}</div>
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
	}
	getTracks(e){
		$(".artist_row.album").removeClass("selected");
		$(e.currentTarget).parent().addClass("selected");
		let album_id = String($(e.currentTarget).data("spot-id"));
		this.setState({selectedAlbum: album_id});
		let url =  `${this.props.info.spotify_base}/albums/${album_id}/tracks?limit=20`;
		sendAjaxRequest(url,this.props.info.token,this.showAlbumTracks);
	}
	hideTracks(e){
		$(e.currentTarget).parent().addClass("selected");
		this.setState({showTracks:false});
	}
	getAdditionalTracks(e){
		e.stopPropagation();
		let url = $(e.currentTarget).attr("data-next-url");
		sendAjaxRequest(url,this.props.info.token,this.showAlbumTracks);
	}
	showAlbumTracks(output){
		let new_tracks = Object.assign({},this.state.tracks,output);
		this.setState({showTracks:true,tracks:new_tracks});
	}
	displayTracks(){
		return(
			<div className="tracks_holder">
			{this.state.tracks.items.map(function(track,index){
					var disc_number = null;
					var key_base = new Date().getTime();
					if(track.track_number==1 && track.disc_number != null){
						disc_number = <DiscName key={(track.id + "disc_number" )} unique_key={key_base} disc_number={track.disc_number} />;
					}
					return (<div key={String(index) + "holder"} >{disc_number}<Track key={index} unique_key={track.id} track_number={track.track_number} name={track.name} /></div>)
				}
			)}
			<div className="tracks_nav">
				{ this.state.tracks.previous != null &&
					<a className="prev_tracks" data-next-url={this.state.tracks.previous} onClick={this.getAdditionalTracks}>Previous Page</a>
				}
				{ this.state.tracks.next != null &&
					<a className="next_tracks" data-next-url={this.state.tracks.next} onClick={this.getAdditionalTracks}>Next Page</a>
				}
			</div>
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
				<div className={`artist_photo album ${noPhoto}`} style={style}></div>
	    		<div className="artist_name album">
	    			<div className="h1">{target.name}</div>
	    			<div className="popularity">
	    				<span className="review">{stars}</span>
	    				<span className="release_date">{album_year}</span>
	    			</div>
	    		</div>

	    		{this.state.showTracks==false &&
	    			<a className="show_tracks" onClick={this.getTracks} data-spot-id={target.id} >Show Tracks</a>	
	    		}

	    		{this.state.showTracks==true &&
	    			<a className="hide_tracks" onClick={this.hideTracks}>Hide Tracks</a>	
	    		}

	    		{ (target.id==this.state.selectedAlbum && tracks_loaded ) &&
	    			this.displayTracks()
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
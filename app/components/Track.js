import React from 'react';
import $ from 'jquery';
import {connect} from 'react-redux';
import rootReducer from "../reducers/Spotify";
import marked from "marked";
import {sendAjaxRequest} from "../modules/sendAjaxRequest";

class TrackInfo extends React.Component{
		constructor(props) {
			super(props);

		}
		createReviewsArea() {
			var total = Math.round(Number((Number(this.props.popularity)/100) * 5));;
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
  		convertTime(){
  			//https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript
  			var minutes = Math.floor(this.props.duration / 60000);
  			var seconds = ((this.props.duration % 60000) / 1000).toFixed(0);
  			var time = minutes + ":" + (seconds < 10 ? '0' : '') + seconds + " min";
  			var html = marked(time + "min", {sanitize: false});
  			return { __html: time };
  		}
		render(){
			return (
				<div className="album-track-details">
					<div className="popularity">
	    				<span className="review"  dangerouslySetInnerHTML={this.createReviewsArea()}></span>
	    				<span className="duration"  dangerouslySetInnerHTML={this.convertTime()}></span>
	    			</div>
					
				</div>
			)
			
		}
}

class Track extends React.Component{
		constructor(props) {
			super(props);
			this.state = {
				track_info: null
			}
			this.getTrackInfo = this.getTrackInfo.bind(this);
			this.showTrackInfo = this.showTrackInfo.bind(this);
			this.ajaxError = this.ajaxError.bind(this)
		}
		ajaxError(jqXHR, textStatus){
			console.log(jqXHR)
			console.log(textStatus)
			this.props.setAjaxError(jqXHR.responseJSON);
		}
		showTrackInfo(output){
			this.setState({track_info: output});
		}
		getTrackInfo(e){
			e.preventDefault();
			sendAjaxRequest(this.props.track_url,this.props.info.token,this.showTrackInfo,this.ajaxError);
		}
		render(){
			return (
				<div>
				<div key={Math.random()} className="album-track" onClick={this.getTrackInfo}><span>{this.props.track_number}</span> {this.props.name}</div>
				{this.state.track_info &&
					<TrackInfo duration={this.state.track_info.duration_ms} popularity={this.state.track_info.popularity}/>
				}
				</div>
			)
			
		}
}


const mapStateToProps = function(state){
	return {"info":state};		
}

export default connect(mapStateToProps)(Track)

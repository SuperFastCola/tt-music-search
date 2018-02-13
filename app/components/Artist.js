import React from 'react';
import $ from 'jquery';
import {connect} from 'react-redux';
import rootReducer from "../reducers/Spotify";
import setResults from "../actions";

class Artist extends React.Component {
	constructor(props) {
		super(props);
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
	    	<div className="artist_row">
				<div className={`artist_photo ${noPhoto}`} style={style}></div>
	    		<span className="artist_name">{target.name}</span>
	    	</div>
	    )
  }
}

const mapStateToProps = function(state){
	return {"info":state};		
}
export default connect(mapStateToProps)(Artist)
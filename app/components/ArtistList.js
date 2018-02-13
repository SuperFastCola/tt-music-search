import React from 'react';
import $ from 'jquery';
import {connect} from 'react-redux';
import rootReducer from "../reducers/Spotify";
import setResults from "../actions";
import Artist from "./Artist";

class ArtistList extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let target = this.props.info.results.artists.items;
	    return (
	    	<div className="artist_listing">
			    {target.map((artist,index) => 
					(<Artist key={index} id={index}/>)
				)}
	    	</div>
	    )
  }
}

const mapStateToProps = function(state){
	return {"info":state};		
}
export default connect(mapStateToProps)(ArtistList)

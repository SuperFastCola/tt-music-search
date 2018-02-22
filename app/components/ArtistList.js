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
		let target = null
		if(typeof this.props.info.results != "undefined"){
			target = this.props.info.results.items;
		}
	    return (
	    	<div className="artist_listing">
	    		{target != null && target.length>0 ?
	    		 	target.map((artist,index) => 
						(<Artist key={index} id={index}/>)
					)
	    		: (<div className="no-results">No Results Found</div>)
	    		}
	    	</div>
	    )
  }
}

const mapStateToProps = function(state){
	return {"info":state};		
}
export default connect(mapStateToProps)(ArtistList)

import React from 'react';
import $ from 'jquery';
import {connect} from 'react-redux';
import rootReducer from "../reducers/Spotify";
import setResults from "../actions";

class Album extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		
		let target = this.props.info.results.items[this.props.id];
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
	    	<div className="artist_row" data-spot-id={target.id}>
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
export default connect(mapStateToProps,mapDispatchToProps)(Album)
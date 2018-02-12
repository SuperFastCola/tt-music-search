import React from 'react';
import $ from 'jquery';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.startSearch = this.startSearch.bind(this);
		this.ajaxError = this.ajaxError.bind(this);
		this.setHeaderForAjax = this.setHeaderForAjax.bind(this)
		this.state = {
			token: this.props.token,
			urls:{
				part1:"https://api.spotify.com/v1/search?q=",
				part2: "&type=artist"
			}
		}
	}
	componentDidMount() {
		this.setState({token:this.props.token})
	}
	componentDidCatch(error, info) {
	}
	results(output){
		console.log(output)
	}
	ajaxError(jqXHR, textStatus){
		console.log(jqXHR)
		console.log(textStatus)
	}
	setHeaderForAjax(xhr){
		xhr.setRequestHeader("Authorization", "Bearer " + this.state.token );
	}
	startSearch(){
		var search_string = String($("input[name=query]").val()).replace(/\s/g,"%20");
		var search_url = this.state.urls.part1 + search_string +this.state.urls.part2;

		var request = $.ajax({
			url: search_url,
			method: "GET",
			dataType: "json",
			beforeSend: this.setHeaderForAjax
		});
		request.done(this.results);
		request.fail(this.ajaxError);
	}
	render() {
		console.log(this.state);
	    return (
	    	<div>
	    	<p>Search Artists</p>
	    	<form className="search_form">
	    		<input type="text" name="query" placeholder="Enter Your Query" onBlur={this.startSearch}/>
	    	</form>
	    	</div>
	    )
  }
}

class Login extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		console.log(this.props)
	}
	componentDidCatch(error, info) {
		console.log(error)
		console.log(info)
	}
	render() {
	    return (
	    	<div>
	    	<p>Please Login To Spotify to use use the Web API</p>
	    	<a href={this.props.auth}>Login</a>
	    	</div>
	    )
  }
}

export {Login,Search}

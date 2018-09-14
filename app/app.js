import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import {Provider} from 'react-redux';
import { createStore } from "redux";
import rootReducer from "./reducers/Spotify";
import 'styles';

let initiailState = {
	token:null, //stores Spotify access token for ajax requests
	error:null, //holds ajax error text - if not null go to Spotify login
	results:null, //artists, albums collections
	next_url: null, //paging url for albums,artists
	prev_url: null, //paging url for albums,artists
	selected_artist:null, //if null shows search box, else artist name
	selected_tracks:null, //tracks collection toggle above album
	next_tracks_url: null, //paging for tracks navigation - some albums have more than 50 results.
	prev_tracks_url: null, //paging for tracks navigation
	category:"newreleases", //determines which collection component used
	spotify_base: "https://api.spotify.com/v1",
	new_releases_path: "/browse/new-releases",
	search:{
		url:"https://api.spotify.com/v1/search?q=",
		param: "&type=",
		subject: "artist"
	},
	auth: { //for login
		url:"https://accounts.spotify.com/authorize",
		token_path: "https://57zo7eoil7.execute-api.us-east-1.amazonaws.com/prod/stagedoor",
		client_id:"ff309ab919044f60b2fbcf76ed9095e5",
		redirect_uri: String(window.location.origin + "/").replace(/\//g,"%2F"),
		response_type:"token",
	}
}

//build login authentication url
initiailState.auth.fullurl = initiailState.auth.url +"?client_id="+initiailState.auth.client_id;
initiailState.auth.fullurl+= "&redirect_uri="+initiailState.auth.redirect_uri;
initiailState.auth.fullurl+= "&response_type="+initiailState.auth.response_type;

//connect store
let store = createStore(rootReducer,initiailState);

ReactDOM.render(
	<Provider store={store}>
    	<App name="Spotify Web App"/>
  	</Provider>, 
	document.getElementById('app')
);

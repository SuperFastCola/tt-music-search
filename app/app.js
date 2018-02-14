import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import {Provider} from 'react-redux';
import { createStore } from "redux";
import rootReducer from "./reducers/Spotify";
import 'styles';

let initiailState = {
	token:null,
	error:null,
	results:null,
	selected_artist:null,
	selected_tracks:null,
	category:"artists",
	spotify_base: "https://api.spotify.com/v1",
	search:{
		url:"https://api.spotify.com/v1/search?q=",
		param: "&type=",
		subject: "artist"
	},
	auth: {
		url:"https://accounts.spotify.com/authorize",
		client_id:"ff309ab919044f60b2fbcf76ed9095e5",
		redirect_uri: String("http://localhost:3000/").replace(/\//g,"%2F"),
		response_type:"token",
	}
}

initiailState.auth.fullurl = initiailState.auth.url +"?client_id="+initiailState.auth.client_id;
initiailState.auth.fullurl+= "&redirect_uri="+initiailState.auth.redirect_uri;
initiailState.auth.fullurl+= "&response_type="+initiailState.auth.response_type;

let store = createStore(rootReducer,initiailState);

ReactDOM.render(
	<Provider store={store}>
    	<App name="Spud"/>
  	</Provider>, 
	document.getElementById('app')
);

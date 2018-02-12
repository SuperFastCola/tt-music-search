import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/Main';
import 'styles';

let initiailState = {
	token:null,
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

ReactDOM.render(
    <App name="Spud" token={initiailState.token} auth={initiailState.auth.fullurl}/>,
	document.getElementById('app')
);

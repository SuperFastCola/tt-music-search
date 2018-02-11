import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import {Provider} from 'react-redux';
import { createStore } from "redux";
import rootReducer from "./reducers/Spotify";
import 'styles';

let store = createStore(rootReducer,{"token":null});

ReactDOM.render(
	<Provider store={store}>
    	<App name="Spud"/>
  	</Provider>, 
	document.getElementById('app')
);

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import createStore from './src/store'
import AppContainer from './src/navigation';

const store = createStore();

export default class App extends Component {
	render(){
		return(
			<Provider store={store}>
				<AppContainer />
			</Provider>
		)
	}
}

import React, { Component } from 'react';
import './App.css';
import { URL_TEST } from './CONSTANTS.js';
import HocNews from './fetch-v1/hoc-news';

class App extends Component {
	render() {
		return (
			<div>
				<pre>{URL_TEST}</pre>
				<div>
					<HocNews />
				</div>
			</div>
		);
	}
}

export default App;

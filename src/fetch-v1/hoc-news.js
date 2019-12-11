import React, { Component } from 'react';
import URL_HELPER from '../CONSTANTS';
import TableView from './table-view';

class HocNews extends Component {
	constructor(props) {
		super(props);
		this.state = { result: null, searchTerm: URL_HELPER.DEFAULT_QUERY };
		this.onSearchChange = this.onSearchChange.bind(this);
		this.setSearchResult = this.setSearchResult.bind(this);
		this.onDissmiss = this.onDissmiss.bind(this);
	}

	componentDidMount() {
		const { searchTerm } = this.state;
		const urlRequest = `${URL_HELPER.PATH_BASE}${URL_HELPER.PATH_SEARCH}?${URL_HELPER.PARAM_SEARCH}${searchTerm}`;
		fetch(urlRequest)
			.then((response) => {
				// étape obligatoire dans l'utilisation de fetch sinon il s'agit d'un stream
				let jsonResponse = response.json();
				return jsonResponse;
			})
			.then((result) => {
				this.setSearchResult(result);
			})
			.catch((error) => {
				return error;
			});
	}

	render() {
		const { searchTerm, result } = this.state;
		if (!result) return null;
		return (
			<div>
				<h4>V1 recupération des news</h4>

				<TableView list={result.hits} onDissmiss={this.onDissmiss} />
			</div>
		);
	}

	setSearchResult = (result) => this.setState({ result });
	onSearchChange = (e) => this.setState({ searchTerm: e.target.value });
	onDissmiss = (id) => {
		const isNotId = (item) => item.objectID !== id;
		const updatedHits = this.state.result.hits.filter(isNotId);
		this.setState({ result: { ...this.state.result, hits: updatedHits } });
	};
}
export default HocNews;

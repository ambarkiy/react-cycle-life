import React, { Component } from 'react';
import URL_HELPER from '../CONSTANTS';
import TableView from './table-view';
import SearchBar from './search-bar';

class HocNews extends Component {
	constructor(props) {
		super(props);
		this.state = { result: null, searchTerm: URL_HELPER.DEFAULT_QUERY };
		this.fetchHits = this.fetchHits.bind(this);
		this.onSearchChange = this.onSearchChange.bind(this);
		this.setSearchResult = this.setSearchResult.bind(this);
		this.onDissmiss = this.onDissmiss.bind(this);
		this.onSubmitSearch = this.onSubmitSearch.bind(this);
	}
	fetchHits = (searchTerm, page = '0', hitsParPage = URL_HELPER.DEFAULT_HITS_PER_PAGE) => {
		const urlRequest = `${URL_HELPER.PATH_BASE}${URL_HELPER.PATH_SEARCH}?${URL_HELPER.PARAM_SEARCH}
		${searchTerm}&${URL_HELPER.PARAM_PAGE}${page}&${URL_HELPER.PARAM_HITS_PER_PAGE}${hitsParPage}`;
		fetch(urlRequest)
			.then((response) => response.json())
			.then((result) => this.setSearchResult(result))
			.catch((error) => error);
	};

	componentDidMount() {
		const { searchTerm } = this.state;
		this.fetchHits(searchTerm);
	}

	render() {
		const { searchTerm, result } = this.state;
		const page = (result && result.page) || 0;

		return (
			<div>
				<h4>V1 recupération des news</h4>
				<SearchBar value={searchTerm} onChange={this.onSearchChange} onSubmit={this.onSubmitSearch}>
					Rechercher
				</SearchBar>
				{result && <TableView list={result.hits} onDissmiss={this.onDissmiss} />}
				<button onClick={() => this.fetchHits(searchTerm, page + 1)}>Suivant</button>
			</div>
		);
	}

	onSearchChange = (e) => {
		const searchTerm = e.target.value;
		this.setState({ searchTerm: searchTerm });
	};

	onSubmitSearch = (event) => {
		const { searchTerm } = this.state;
		this.fetchHits(searchTerm);
		event.preventDefault();
	};

	setSearchResult = (result) => {
		const { hits, page } = result;
		const oldHits = page !== 0 ? this.state.result.hits : [];
		const updatedHits = [
			...oldHits,
			...hits
		];
		this.setState({
			result: { hits: updatedHits, page }
		});
	};

	onDissmiss = (id) => {
		const isNotId = (item) => item.objectID !== id;
		const updatedHits = this.state.result.hits.filter(isNotId);
		this.setState({ result: { ...this.state.result, hits: updatedHits } });
	};
}
export default HocNews;

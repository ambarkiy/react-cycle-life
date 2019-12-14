import React, { Component } from 'react';
import URL_HELPER from '../CONSTANTS';
import TableView from './table-view';
import SearchBar from './search-bar';
import Axios from 'axios';

class HocNews extends Component {
	_isMounted = false;
	constructor(props) {
		super(props);
		this.state = {
			results: null,
			searchKey: '',
			searchTerm: URL_HELPER.DEFAULT_QUERY,
			error: null
		};
		this.needToSearchHits = this.needToSearchHits.bind(this);
		this.fetchHits = this.fetchHits.bind(this);
		this.onSearchChange = this.onSearchChange.bind(this);
		this.setSearchResult = this.setSearchResult.bind(this);
		this.onDissmiss = this.onDissmiss.bind(this);
		this.onSubmitSearch = this.onSubmitSearch.bind(this);
	}
	fetchHits = (searchTerm, page = '0', hitsParPage = URL_HELPER.DEFAULT_HITS_PER_PAGE) => {
		const urlRequest = `${URL_HELPER.PATH_BASE}${URL_HELPER.PATH_SEARCH}?${URL_HELPER.PARAM_SEARCH}
		${searchTerm}&${URL_HELPER.PARAM_PAGE}${page}&${URL_HELPER.PARAM_HITS_PER_PAGE}${hitsParPage}`;

		Axios(urlRequest)
			.then((response) => response)
			.then((result) => this._isMounted && this.setSearchResult(result))
			.catch((error) => this._isMounted && this.setState({ error }));
	};

	componentDidMount() {
		this._isMounted = true;
		const { searchTerm } = this.state;
		this.setState({ searchKey: searchTerm });
		this.fetchHits(searchTerm);
	}
	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		const { searchTerm, results, searchKey, error } = this.state;
		const page = (results && results[searchKey] && results[searchKey].page) || 0;
		const list = (results && results[searchKey] && results[searchKey].hits) || [];
		if (error) {
			return <p>Une erreur s'est produite</p>;
		}
		return (
			<div>
				<h4>V1 recupération des news</h4>
				<SearchBar value={searchTerm} onChange={this.onSearchChange} onSubmit={this.onSubmitSearch}>
					Rechercher
				</SearchBar>
				{<TableView list={list} onDissmiss={this.onDissmiss} />}
				<button onClick={() => this.fetchHits(searchKey, page + 1)}>Suivant</button>
			</div>
		);
	}

	onSearchChange = (e) => {
		const searchTerm = e.target.value;
		this.setState({ searchTerm: searchTerm });
	};

	onSubmitSearch = (event) => {
		const { searchTerm } = this.state;
		this.setState({ searchKey: searchTerm });
		if (this.needToSearchHits(searchTerm)) {
			this.fetchHits(searchTerm);
		}
		event.preventDefault();
	};

	setSearchResult = (result) => {
		const { hits, page } = result;
		const { searchKey, results } = this.state;
		const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
		const updatedHits = [
			...oldHits,
			...hits
		];

		this.setState({
			results: {
				...results,
				[searchKey]: { hits: updatedHits, page }
			}
		});
	};

	onDissmiss = (id) => {
		const { searchKey, results } = this.state;
		const { hits, page } = results[searchKey];
		const isNotId = (item) => item.objectID !== id;
		const updatedHits = hits.filter(isNotId);
		this.setState({
			results: {
				...results,
				[searchKey]: { hits: updatedHits, page }
			}
		});
	};

	needToSearchHits(searchTerm) {
		return !this.state.results[searchTerm];
	}
}
export default HocNews;

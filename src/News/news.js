import React, { Component } from 'react';
import URL_HELPER from '../CONSTANTS';
import TableView from '../TableView/table-view';
import SearchBar from '../SearchBar/search-bar';
import axios from 'axios';
import { ButtonWithLoading } from '../Button';

class News extends Component {
	_isMounted = false;
	constructor(props) {
		super(props);
		this.state = {
			results: null,
			searchKey: '',
			searchTerm: URL_HELPER.DEFAULT_QUERY,
			error: null,
			isLoading: false,
			sortKey: 'NONE',
			isSortReverse: false
		};

		this.needToSearchHits = this.needToSearchHits.bind(this);
		this.fetchHits = this.fetchHits.bind(this);
		this.onSearchChange = this.onSearchChange.bind(this);
		this.setSearchResult = this.setSearchResult.bind(this);
		this.onDissmiss = this.onDissmiss.bind(this);
		this.onSubmitSearch = this.onSubmitSearch.bind(this);
		this.onSort = this.onSort.bind(this);
	}

	fetchHits = (searchTerm, page = '0', hitsParPage = URL_HELPER.DEFAULT_HITS_PER_PAGE) => {
		this.setState({ isLoading: true });
		const urlRequest = `${URL_HELPER.PATH_BASE}${URL_HELPER.PATH_SEARCH}?${URL_HELPER.PARAM_SEARCH}${searchTerm}&${URL_HELPER.PARAM_PAGE}${page}&${URL_HELPER.PARAM_HITS_PER_PAGE}${hitsParPage}`;

		axios(urlRequest)
			.then((response) => response.data)
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
		const { searchTerm, results, searchKey, error, isLoading, sortKey, isSortReverse } = this.state;
		const page = (results && results[searchKey] && results[searchKey].page) || 0;
		const list = (results && results[searchKey] && results[searchKey].hits) || [];

		if (error) {
			return <p>Une erreur s'est produite</p>;
		}
		return (
			<div className='page'>
				<div className='interaction'>
					<SearchBar value={searchTerm} onChange={this.onSearchChange} onSubmit={this.onSubmitSearch}>
						Rechercher
					</SearchBar>
				</div>
				<div>
					<TableView
						list={list}
						onDissmiss={this.onDissmiss}
						sortKey={sortKey}
						onSort={this.onSort}
						isSortReverse={isSortReverse}
					/>
					<ButtonWithLoading isLoading={isLoading} onClick={() => this.fetchHits(page + 1)}>
						Suivant
					</ButtonWithLoading>
				</div>
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
			},
			isLoading: false
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

	onSort(sortKey) {
		const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
		this.setState({ sortKey, isSortReverse });
	}
}
export default News;

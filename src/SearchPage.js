import React, { Component } from 'react';
import request from 'superagent';
import './App.css';
import Container from './Container.js';
import Searchbar from './Searchbar.js';

export default class App extends Component {
  state = {
    search: null,
    searchType: null,
    selected: '',
    data: [],
    sort: 'pokemon',
    searchAttack: null,
    searchDefense: null,
    page: 1,
    info: {}
  }

  async componentDidMount() {
    const fetchedData = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex`);
    this.setState({ data: fetchedData.body.results });
  }

  componentDidMount = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    // searchParams will be pokemon=marsh&page=1
    const query = searchParams.get('pokemon');
    // searchParams.get looks for the key 'pokemon' and returns the value associated with it.
    // query will be 'marsh'
    this.setState({searchQuery: query});
    // in state, searchQuery will be query (or marsh).
    if (query) {
    let page = 1;
    if (searchParams.get('page')){
    page = searchParams.get('page');
    }
    // if there is a query, it will initialize the page number to 1. But if there is a key of 'page' in the search bar, // then it will reassign the page variable to what is in the searchParams.
    const fetchedPokemon = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex/?pokemon=${query}&page=${page}`);
    // grabs the information from the API according to the query value (string) and the page value (number)
    this.setState({ body: fetchedPokemon.body, pokemon: fetchedPokemon.body.results });
    // adds the fetched information to state.
        } else {
          const fetchedPokemon = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex`);
          this.setState({ body: fetchedPokemon.body, pokemon: fetchedPokemon.body.results })
        }
    // this else statement is the 'default.' If there are no existing search parameters, then it will show every Pokemon.
    }
    // In short, this code makes it so that the first time someone loads the page, it checks the URL of the site, finds the search parameters, and generates an initial page. So if you give someone a link to something you searched, they will see the same results.

  handleName = (event) => {
    const value = event.target.value;
    this.setState({ search: value });
  }

//   handleChange = (event) => {
//     const value = event.target.value;
//     this.setState({ searchType: value });
//   }

//   handleChangeAttack = (event) => {
//     const value = event.target.value;
//     this.setState({ searchAttack: value });
//   }

//   handleChangeDefense = (event) => {
//     const value = event.target.value;
//     this.setState({ searchDefense: value });
//   }

  handleChangeSort = (event) => {
    const value = event.target.value;
    this.setState({ sort: value });
  }

  handleClick = async () => {
    const fetchedData = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?${this.state.sort}=${this.state.search}`);
    this.setState({ data: fetchedData.body.results });
  }

//   handleClickType = async () => {
//     const fetchedData = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?type=${this.state.searchType}&sort=${this.state.sort}`);
//     this.setState({ data: fetchedData.body.results });
//   }

//   handleClickAttack = async () => {
//     const fetchedData = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?attack=${this.state.searchAttack}&sort=${this.state.sort}`);
//     this.setState({ data: fetchedData.body.results });
//   }

//   handleClickDefense = async () => {
//     const fetchedData = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?defense=${this.state.searchDefense}&sort=${this.state.sort}`);
//     this.setState({ data: fetchedData.body.results });
//   }

  backward = async () => {
    const backwardPage = this.state.page - 1;
    this.setState({ page: backwardPage });
    const fetchedData = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?${this.state.sort}=${this.state.search}&page=${backwardPage}`);
    this.setState({ data: fetchedData.body.results, info: fetchedData.body });
    this.setState({hideForward: false});
    if (this.state.page === 1) {
        this.setState({hideBackward: true});
    } else {
        this.setState({hideBackward: false});
    }
  }

  forward = async () => {
    const forwardPage = this.state.page + 1;
    this.setState({ page: forwardPage });
    const fetchedData = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?${this.state.sort}=${this.state.search}&page=${forwardPage}`);
    const info = fetchedData.body;
    this.setState({ data: fetchedData.body.results, info: info });
    this.setState({hideBackward: false});
    if (this.state.page === (Math.ceil(info.count/info.perPage))) {
        this.setState({hideForward: true});
    } else {
        this.setState({hideForward: false});
    }
  }

render() {
  return (
    <div>
      <header>
        <h1>Pokemon Pokedex</h1>
        {!this.state.hideBackward && <button onClick={this.backward}>Previous</button>}
        {!this.state.hideForward && <button onClick={this.forward}>Next</button>}
      </header>

      <main>
        <section className="options">

          <Searchbar name='name' search={this.handleName} submit={this.handleClick}
          sort={this.handleChangeSort} />

        </section>
        <section className="list-section">
          <section className="creatures">
            <Container data={this.state.data}/>
          </section>
        </section>
      </main>
    </div>
  );
}}
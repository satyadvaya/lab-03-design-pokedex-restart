import React, { Component } from 'react';
import request from 'superagent';
import './App.css';
import Container from './List.js';
import Searchbar from './Searchbar.js';
import Header from './header.js';

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

// COMBINE SEARCH CONTAINER WITH SEARCHBAR
// ADD A SORT DROPDOWN
// VERIFY SEARCH QUERY WITH SORT
// UPDATE CLICK BUTTON AND LOCATION
// VERIFY BUTTON PAGINATION LOGIC
// DISPLAY SEARCH PARAMS IN URL AND MAKE PERSISTENT
// BUTTON UP CSS
// HEADER AND NAVIGATION
// FINISH REFACTORING


  // async componentDidMount() {
  //   const fetchedData = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex`);
  //   this.setState({ data: fetchedData.body.results });
  // }

  componentDidMount = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get('pokemon');
    this.setState({searchQuery: query});

    if (query) {
    let page = 1;
    if (searchParams.get('page')){
    page = searchParams.get('page');
    }
    
    const fetchedPokemon = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex/?pokemon=${query}&page=${page}`);
    this.setState({ body: fetchedPokemon.body, pokemon: fetchedPokemon.body.results });
        } else {
          const fetchedPokemon = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex`);
          this.setState({ body: fetchedPokemon.body, pokemon: fetchedPokemon.body.results })
        }
    }

  handleName = (event) => {
    const value = event.target.value;
    this.setState({ search: value });
  }

  handleChangeSort = (event) => {
    const value = event.target.value;
    this.setState({ sort: value });
  }

  handleChangeProperty = (event) => {
    const value = event.target.value;
    this.setState({ searchtype: value });
  }

  handleClick = async () => {
    const search =`https://alchemy-pokedex.herokuapp.com/api/pokedex?sort=${this.state.sort}&${this.state.searchtype}=${this.state.search}`
    const fetchedData = await request.get(search);
    this.setState({ data: fetchedData.body.results });
    window.location.hash=search.split('?')[1]
  }

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
      <Header></Header>

        {!this.state.hideBackward && <button onClick={this.backward}>Previous</button>}
        {!this.state.hideForward && <button onClick={this.forward}>Next</button>}

      <main>
        <section className="options">

          <Searchbar name ={this.state.searchtype} search={this.handleName} submit={this.handleClick}
          searchtype={this.handleChangeProperty} />

          <select className="creature-type-filter" onChange={this.handleChangeSort}>
            <option value="pokemon" defaultValue>
            Pokemon
            </option>
            <option value="type">Type</option>
            <option value="attack">Attack</option>
            <option value="defense">Defense</option>
            <option value="height">Height</option>
          </select>

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
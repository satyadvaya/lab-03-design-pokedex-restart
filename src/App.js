import React, { Component } from 'react';
import request from 'superagent';
import './App.css';
import Container from './Container.js';
import Searchbar from './Searchbar.js';


export default class App extends Component {
  state = {
    searchName: null,
    searchType: null,
    selected: '',
    data: [],
    sort: 'pokemon',
    searchAttack: null,
    searchDefense: null
  }

  handleName = (event) => {
    const value = event.target.value;
    this.setState({ searchName: value });
  }

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({ searchType: value });
  }

  handleChangeAttack = (event) => {
    const value = event.target.value;
    this.setState({ searchAttack: value });
  }

  handleChangeDefense = (event) => {
    const value = event.target.value;
    this.setState({ searchDefense: value });
  }

  handleChangeSort = (event) => {
    const value = event.target.value;
    this.setState({ sort: value });
  }

  handleClick = async () => {
    const fetchedData = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?pokemon=${this.state.searchName}&sort=${this.state.sort}`);
    this.setState({ data: fetchedData.body.results });
  }

  handleClickType = async () => {
    const fetchedData = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?type=${this.state.searchType}&sort=${this.state.sort}`);
    this.setState({ data: fetchedData.body.results });
  }

  handleClickAttack = async () => {
    const fetchedData = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?attack=${this.state.searchAttack}&sort=${this.state.sort}`);
    this.setState({ data: fetchedData.body.results });
  }

  handleClickDefense = async () => {
    const fetchedData = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?defense=${this.state.searchDefense}&sort=${this.state.sort}`);
    this.setState({ data: fetchedData.body.results });
  }

render() {
  return (
    <div>
      <header>
        <h1>Pokemon Pokedex</h1>
      </header>

      <main>
        <section className="options">
          {/* lets move this to another component */}
          <Searchbar name='attack' search={this.handleChangeAttack} submit={this.handleClickAttack} />
          <Searchbar name='defense' search={this.handleChangeDefense} submit={this.handleClickDefense} />
          <Searchbar name='name' search={this.handleName} submit={this.handleClick} />
          <select className="creature-type-filter" onChange={this.handleChange}>
            <option value="" defaultValue>
              All Types
            </option>
            <option value="bug">Bug</option>
            <option value="dark">Dark</option>
            <option value="dragon">Dragon</option>
            <option value="electric">Electric</option>
            <option value="fairy">Fairy</option>
            <option value="fighting">Fighting</option>
            <option value="fire">Fire</option>
            <option value="flying">Flying</option>
            <option value="ghost">Ghost</option>
            <option value="grass">Grass</option>
            <option value="ground">Ground</option>
            <option value="ice">Ice</option>
            <option value="normal">Normal</option>
            <option value="poison">Poison</option>
            <option value="psychic">Psychic</option>
            <option value="rock">Rock</option>
            <option value="steel">Steel</option>
            <option value="water">Water</option>
          </select>
          <button onClick={this.handleType}>Search by Type</button>
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
import React, { Component } from 'react';
import request from 'superagent';
import './App.css';
import Container from './Container.js';
import data from './data.js';
import Searchbar from './Searchbar.js';


export default class App extends Component {
  state = {
    searchName: null,
    searchQuery: null,
    selected: '',
    data: [],
    sort: 'pokemon'
  }

  handleName = (event) => {
    const value = event.target.value;
    this.setState({ searchName: value });
    console.log(value);
  }

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({ searchQuery: value });
  }

  handleClick = async () => {
    const fetchedData = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?pokemon=${this.state.searchName}&sort=${this.state.sort}`);
    this.setState({ data: fetchedData.body });
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
          <Searchbar search={this.handleName} submit={this.handleClick} />
          <select className="creature-type-filter" onChange={this.handleChange}>
            <option value="" defaultValue>
              All Types
            </option>
            <option value="">ALL</option>
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
        </section>


        <section className="list-section">
          <ul className="creatures">
            <Container data={this.state.data}/>
          </ul>
        </section>
      </main>
    </div>
  );
}}
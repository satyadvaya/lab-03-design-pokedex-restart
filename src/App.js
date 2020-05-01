import React, { Component } from 'react';
import request from 'superagent';
import './App.css';

export default class App extends Component {
  state = {
    searchQuery: null,
    selected: '',
    data: []
  }

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({ searchQuery: value });
  }

  handleClick = async () => {
    const fetchedData = await request.get('https://alchemy-pokedex.herokuapp.com/api/pokedex');
    this.setState({ data: fetchedData.body });
  }

  render() {
    // 1c2. log out the state on change;
    // console.log('|| this.state.', this.state.searchQuery);
    // 2a. log out my data (however I'm getting it);
    // console.log('|| data', data);
    return (     
      <div>        
        <input onChange={this.handleChange} />    
        <button onClick={this.handleClick}>Search</button>
        {
          // 2.b1 map over hard-coded data in this.state data ...
          this.state.data.map(type => {
            // 2.b2 ... and make h1s for each item in the array;
          return <h1>{type.character} : {type.type}</h1>
          })
        }
      </div>
    )
  }
}

render() {
  return (
    <div>
      <header>
        <img src="logo192.png" alt="React Logo" />
        <h1>Pokemon Pokedex</h1>
      </header>

      <main>
        <section className="options">
          {/* lets move this to another component */}
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
            {
              creatureData
                .filter(creature => {
                  // if there is nothing selected, show ALL CREATURES
                  if (!this.state.selected) return true;
          
                  // otherwise only show the creature if the creature type is the same as the selected creature type
                  return creature.type === this.state.selected;
                })
                .map(animal => {
                console.log(animal)
                return <Creature bovid={animal} />
                })        
            }
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;

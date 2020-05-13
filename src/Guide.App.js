import React, { Component } from 'react'
import request from 'superagent';

// get my quoteList working with hard-coded data
const data = [
  {
    character: 'some character 1',
    quote: 'some quote 1',
    img: 'some img 1'
  },
  {
    character: 'some character 2',
    quote: 'some quote 2',
    img: 'some img 2'
  },
  {
    character: 'some character 3',
    quote: 'some quote 3',
    img: 'some img 3'
  },
]

export default class App extends Component {
  // initialize state;
  state = {
    searchQuery: null,
    data: data,
  }
  // 1b. add an event handler that logs hello world on change;
  handleChange = (event) => {
    // get the value of the input;
    const value = event.target.value;
    // console.log('hello world', value);
    // 1c1. update state on change to the value of the input;
    this.setState({ searchQuery: value });
  }
  
  // 3.a log out button event handler;
  handleClick = async () => {
    // 3.b change the event handler so it logs out the state of the search query input;
    // console.log('hello!', this.state.searchQuery);
    // 3.c1 use the search query to make a superagent request ...
    const fetchedData = await request.get(`http://futuramaapi.herokuapp.com/api/quotes?search=${this.state.searchQuery}`);
    // 3.c2 ... and out out the data;
    console.log(fetchedData);
    console.log(fetchedData.body);
    // 3.d use this.setState to update the state with the superagent search query data;
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
          this.state.data.map(quote => {
            // 2.b2 ... and make h1s for each item in the array;
          return <h1>{quote.character} : {quote.quote}</h1>
          })
        }
      </div>
    )
  }
}

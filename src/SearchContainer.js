import React, { Component } from 'react'

export default class SearchContainer extends Component {
    render() {
        return (
            <>
            <div>
            <select className="creature-type-filter" onChange={this.handleChangeSort}>
            <option value="pokemon" defaultValue>
              Pokemon
            </option>
            <option value="type">Type</option>
            <option value="attack">Attack</option>
            <option value="defense">Defense</option>
            <option value="height">Height</option>
            </select>
            </div>
            </>
        )
    }
}

// input box

// search name button

// pokemon dropdown

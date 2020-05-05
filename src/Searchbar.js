import React, { Component } from 'react'

export default class Searchbar extends Component {
    render() {
        return (
            <div>
                {
                this.props.name === 'attack' || this.props.name === 'defense' ?
                <input type='number' min='0' onChange={this.props.search} />
                : <input onChange={this.props.search} />
                }
                <button onClick={this.props.submit}>Search {this.props.name}</button>

                <select className="creature-type-filter" onChange={this.props.sort}>
                <option value="pokemon" defaultValue>
                Pokemon
                </option>
                <option value="type">Type</option>
                <option value="attack">Attack</option>
                <option value="defense">Defense</option>
                <option value="height">Height</option>
                </select>

            </div>
        )
    }
}

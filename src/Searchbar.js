import React, { Component } from 'react'

export default class Searchbar extends Component {
    render() {
        return (
            <div>
                <input onChange={this.props.search} />
                <button onClick={this.props.submit}>Search</button>
            </div>
        )
    }
}

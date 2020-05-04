import React, { Component } from 'react'

export default class Card extends Component {
    render() {
        return (
            <div className='card'>
                <h2>Name: {this.props.pokemon.pokemon}</h2>
                <img src={this.props.pokemon.url_image} alt={this.props.pokemon.pokemon} />
                <h3>Shape: {this.props.pokemon.shape}</h3>
                <h3>Attack: {this.props.pokemon.attack}</h3>
                <h3>Defense: {this.props.pokemon.defense}</h3>
            </div>
        )
    }
}

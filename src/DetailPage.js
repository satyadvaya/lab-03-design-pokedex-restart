import React, { Component } from 'react'
import request from 'superagent';
import './Detail.css';
import Header from './Header'

export default class DetailPage extends Component {
    state = { 
        loading: true,
        pokemon: {}
    }

    async componentDidMount() {
        // wait for the request to finish
        const data = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex/${this.props.match.params.pokemon}`)    

        this.setState({ pokemon: data.body, loading: false })
    }

    render() {
        return (
            <div>
                <Header />
                {
                    this.state.loading
                        ? 'Don\'t freak out, okay?'
                        : <div className = 'detail'>
                            <h2>Name: {this.state.pokemon.pokemon}</h2>
                            <img src={this.state.pokemon.url_image} alt={this.state.pokemon.pokemon} />
                            <h3>Shape: {this.state.pokemon.shape}</h3>
                            <h3>Attack: {this.state.pokemon.attack}</h3>
                            <h3>Defense: {this.state.pokemon.defense}</h3>
                            <h3>Height: {this.state.pokemon.height}</h3>
                            <h3>Weight: {this.state.pokemon.weight}</h3>
                            <h3>hp: {this.state.pokemon.hp}</h3>
                        </div>
                }
            </div>
        )
    }
}
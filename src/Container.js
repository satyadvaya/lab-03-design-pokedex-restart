import React, { Component } from 'react';
import Card from './Card.js';

export default class Container extends Component {
    render() {
        return (
            <div className='container'>
                {this.props.data
                .map(creature => {
                    return <Card pokemon={creature} />
                })}
            </div>
        )
    }
}

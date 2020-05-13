import React, { Component } from 'react';
import Card from './Card.js';

export default class List extends Component {
    render() {
        return (
            <div className='list'>
                {this.props.data
                .map(creature => {
                    return <Card pokemon={creature} />
                })}
            </div>
        )
    }
}

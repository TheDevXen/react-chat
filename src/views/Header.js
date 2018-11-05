import React, { Component } from 'react';
import '../css/App.css';
import { Button, Form, Container } from 'semantic-ui-react'

export default class Header extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>{this.props.title}</h1>
                    <font>{this.props.desc}</font>
                </header>
            </div>
        )
    }
}

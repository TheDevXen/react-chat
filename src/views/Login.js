import React, { Component } from 'react';
import '../css/App.css';
import { Button, Form, Loader, Container, Message, Icon } from 'semantic-ui-react'
import axios from 'axios';
import Cookies from 'universal-cookie';
const LOGIN_URL = 'http://127.0.0.1:3001/login';
export default class Login extends Component {
    constructor() {
        super();
        this.cookies = new Cookies();
        this.state = {
            isLogging: false,
            loginValues: {}
        };
    }
    handleLogin(event) {
        event.preventDefault();
        this.setState({
            isLogging: true
        });
        axios.post(LOGIN_URL, {
            'username': this.state.loginValues.username,
            'password': this.state.loginValues.password
        }).then(res => {
            setTimeout(() => {
                const success = res.data.success;
                if (success) {
                    this.cookies.set('username', this.state.loginValues.username, { path: '/' });
                    this.cookies.set('user_id', res.data.user_id, { path: '/' });
                    window.location = '/'
                } else {
                    this.setState({
                        invalid_message: true,
                    });
                }
                this.setState({
                    isLogging: false
                })
            }, 1000);
        });
    }
    inputHandler(event) {
        event.preventDefault();
        let loginValues = this.state.loginValues;
        let name = event.target.name;
        let value = event.target.value;
        loginValues[name] = value;
        this.setState({ loginValues });
    }
    render() {
        return (
            <html>
                <title>Login | Maarifians</title>
                <div className="App">
                    <header className="App-header">
                        <h1>Login</h1>
                        <font>Login to start chatting with the world</font>
                    </header>
                    <Container>
                        <Message
                            attached
                            header='Welcome to Maarifians!'
                            content='Fill out the form below to login'
                        />
                        <Form onSubmit={this.handleLogin.bind(this)} className='attached fluid segment'>
                            <Form.Field>
                                <label>Username</label>
                                <input onChange={this.inputHandler.bind(this)} name='username' placeholder='First Name' />
                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <input onChange={this.inputHandler.bind(this)} name='password' type='password' placeholder='Last Name' />
                            </Form.Field>
                            <Button type='submit'>Login</Button> <br /><br />
                            <Loader content='Loading' active={this.state.isLogging} />
                            {/* <font>{this.state.username}</font> */}
                        </Form>
                        {
                            this.state.invalid_message &&
                            <Message attached='bottom' warning >
                                <Icon name='help' />
                                Invalid username or password
                            </Message>
                        }
                    </Container>
                </div>
            </html>
        )
    }
}

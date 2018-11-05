import React, { Component } from 'react';
import '../css/App.css';
import { Button, Form, Container } from 'semantic-ui-react'

export default class Register extends Component {
    render() {
        return (
            <html>
                <title>Register | Maarifians</title>
                <div className="App">
                    <header className="App-header">
                        <h1>Register</h1>
                        <font>Login to start chatting with the world</font>
                    </header>
                    <Container>
                        <Form>
                            <Form.Field>
                                <label>First Name</label>
                                <input placeholder='First Name' />
                            </Form.Field>
                            <Form.Field>
                                <label>Last Name</label>
                                <input placeholder='Last Name' />
                            </Form.Field>
                            <Button type='submit'>Submit</Button>
                        </Form>
                    </Container>
                </div>
            </html >
        )
    }
}

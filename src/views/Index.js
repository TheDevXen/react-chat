import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Header from './Header';
import openSocket from 'socket.io-client';
import '../css/Chat.css'
import { Input, Container, Grid, Image, Card, Form, Icon, List } from 'semantic-ui-react';
export default class Index extends Component {
    constructor() {
        super();
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.state = {
            rooms: [],
            isAuthUser: true,
            active_group: 'Developer',
            room_loading: true,
            messages: [
                { username: 'dev', message: 'Hello World' },
                { username: 'dev', message: 'Hi there' },
                { username: 'dev', message: 'Hi' },
            ]
        };
        this.cookies = new Cookies();
        this.username = this.cookies.get('username');
        this.user_id = this.cookies.get('user_id');
        this.socket = openSocket('http://localhost:3001');
        this.socket.on('room list', (rooms) => {
            const _rooms = [];
            for (let room in rooms) {
                _rooms.push(rooms[room]);
            }
            this.setState({
                rooms: _rooms
            })
        });
        this.socket.on('message', (data) => {
            let message = this.state.messages;
            message.push(data);
            if (data.username === this.username) {
                this.setState({
                    inputMessage: ''
                })
            }
            this.setState({
                messages: message
            })
        })
        if (this.username === undefined || this.user_id === undefined || this.user_id === '') {
            window.location = '/login'
        }
    }
    handleGroupChange(title) {
        this.setState({
            active_group: title
        })
    }
    handleSendMessage(e) {
        if (e.key === 'Enter') {
            this.socket.emit('message', {
                username: this.cookies.get('username'),
                message: this.state.inputMessage
            })
        }
    }
    render() {
        return (
            <html>
                <Header title='Main Page' desc={'Welcome ' + this.cookies.get('username')} />
                {
                    this.username !== undefined ? <Container>
                        <Grid >
                            <Grid.Row>
                                <Grid.Column mobile={16} computer={3} >
                                    <List divided relaxed>
                                        <div align='center'>GROUPS</div>
                                        {
                                            this.state.rooms.map((item, index) => {
                                                return <List.Item id={index} onClick={() => {
                                                    this.handleGroupChange(item.title)
                                                }}>
                                                    <List.Icon name='github' size='large' verticalAlign='middle' />
                                                    <List.Content>
                                                        <List.Header as='a' >{item.title}</List.Header>
                                                        <List.Description as='a'>{item.user_count} users</List.Description>
                                                    </List.Content>
                                                </List.Item>
                                            })
                                        }
                                    </List>
                                </Grid.Column>
                                <Grid.Column width={13} only='computer' >
                                    <div class='chat-area'>
                                        <div class="chat">
                                            <div class="chat-title">
                                                <h1>{this.state.active_group}</h1>
                                                <h2>Supah</h2>
                                            </div>

                                            {
                                                this.state.messages.map((item, index) => {

                                                    return (
                                                        <div class="chat-2">
                                                            <div class={item.username === this.cookies.get('username') ? 'bubble you' : 'bubble me'}>
                                                                {item.username === this.cookies.get('username') ? item.message : item.username + ': ' + item.message}
                                                            </div>
                                                        </div>
                                                    )

                                                })
                                            }
                                        </div>
                                    </div>
                                    <Input onKeyPress={this.handleSendMessage} placeholder='Message' action={{ icon: 'send' }} className='input-message'
                                        value={this.state.inputMessage} onChange={(t) => this.setState({ inputMessage: t.target.value })}
                                        style={{ 'width': '100%', 'padding': '30px', 'bottom': 0, 'position': 'absolute' }} />

                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container> : <div class="ui active centered inline loader"></div>
                }
            </html >
        )
    }
}
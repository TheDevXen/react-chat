import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './css/App.css';
import Index from './views/Index';
import Login from './views/Login';
import Register from './views/Register';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path='/' exact component={Index}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
        </div>

      </BrowserRouter>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/home-page/home-page.component';

const HatsPage = () => (
  <div>
    <h1> HATS-PAGE </h1>
  </div>
);

export class App extends Component {

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={HomePage}></Route>
          <Route path='/shop/hats' component={HatsPage}></Route>
        </Switch>
      </div>
    );
  }

}

export default App;

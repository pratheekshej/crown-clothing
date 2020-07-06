import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';
import HomePage from './pages/home-page/home-page.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';

const HatsPage = () => {
  return (
    <div className="hats-page" style={{height: (window.screen.height + 'px')}}>
      <div className="heading"><h1> HATS-PAGE </h1></div>
      <div></div>
    </div>
  );
}

export class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage}></Route>
          <Route path='/shop' component={ShopPage}></Route>
          <Route path='/hats' component={HatsPage}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';
import HomePage from './pages/home-page/home-page.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth } from './firebase/firebase.utils';

const HatsPage = () => {
  return (
    <div className="hats-page" style={{ height: (window.screen.height + 'px') }}>
      <div className="heading"><h1> HATS-PAGE </h1></div>
      <div></div>
    </div>
  );
}

export class App extends Component {
  unsubscribeFromAuth = null;

  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage}></Route>
          <Route path='/shop' component={ShopPage}></Route>
          <Route path='/hats' component={HatsPage}></Route>
          <Route path='/sign-in' component={SignInAndSignUp}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;

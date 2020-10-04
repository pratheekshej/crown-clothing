import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.scss';
import HomePage from './pages/home-page/home-page.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';
import CheckoutPage from './pages/checkout/checkout.component';
import { FixedHeader } from './components/containers/header/fixed-header.styles';
import { ScrollableSection } from './components/containers/body/scrollable-body.styles';

export class App extends Component {
  // DEC : VARS
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      } else { setCurrentUser(userAuth); }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <FixedHeader>
          <Header />
        </FixedHeader>
        <ScrollableSection>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route
              exact
              path='/sign-in'
              render={() =>
                this.props.currentUser ? (
                  <Redirect to='/' />
                ) : (
                    <SignInAndSignUp />
                  )
              }
            />
          </Switch>
        </ScrollableSection>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.scss';
import HomePage from './pages/home-page/home-page.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser, signingInOrOut } from './redux/user/user.actions';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser, isSigningInOrOut } from './redux/user/user.selectors';
import CheckoutPage from './pages/checkout/checkout.component';
import { FixedHeader } from './components/containers/header/fixed-header.styles';
import { ScrollableSection } from './components/containers/body/scrollable-body.styles';
import WidthSpinner from './components/width-spinner/width-spinner.component';
// import { selectCollections } from './redux/shop/shop.selectors';

const HomePageWithSpinner = WidthSpinner(HomePage);
const SignInAndSignUpWithSpinner = WidthSpinner(SignInAndSignUp);

export class App extends Component {
  // DEC : VARS
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser, signing } = this.props; // collectionsArray
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        signing();
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
          signing();
        });
      } else {
        setCurrentUser(userAuth);
      }
      // addCollectionAndDocuments('collections', collectionsArray.map(({ title, items })=> ({title, items})));
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { signingInOrOut } = this.props;
    return (
      <div>
        <FixedHeader>
          <Header />
        </FixedHeader>
        <ScrollableSection>
          <Switch>
            <Route exact path='/' render={() => (<HomePageWithSpinner isLoading={signingInOrOut} {...this.props} />)} /> {/* component={HomePage} */}
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route
              exact
              path='/sign-in'
              render={() =>
                this.props.currentUser ? (
                  <Redirect to='/' />
                ) : (
                    <SignInAndSignUpWithSpinner isLoading={signingInOrOut} {...this.props} />
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
  currentUser: selectCurrentUser, // collectionsArray: selectCollections
  signingInOrOut: isSigningInOrOut
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  signing: () => dispatch(signingInOrOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

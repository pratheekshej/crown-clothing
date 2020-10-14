import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.scss';
import HomePage from './pages/home-page/home-page.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
// import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { checkUserSession } from './redux/user/user.actions'; // setCurrentUser, signingInOrOut
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser, isSigningInOrOut } from './redux/user/user.selectors';
import CheckoutPage from './pages/checkout/checkout.component';
import { FixedHeader } from './components/containers/header/fixed-header.styles';
import { ScrollableSection } from './components/containers/body/scrollable-body.styles';
import withSpinner from './components/with-spinner/with-spinner.component';
// import { selectCollections } from './redux/shop/shop.selectors';

const HomePageWithSpinner = withSpinner(HomePage);
const SignInAndSignUpWithSpinner = withSpinner(SignInAndSignUp);

const App = ({ checkUserSession, currentUser, signingInOrOut, ...otherProps }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <FixedHeader>
        <Header />
      </FixedHeader>
      <ScrollableSection>
        <Switch>
          <Route exact path='/' render={() => (<HomePageWithSpinner isLoading={signingInOrOut} {...otherProps} />)} /> {/* component={HomePage} */}
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/sign-in'
            render={() =>
              currentUser ? (
                <Redirect to='/' />
              ) : (
                  <SignInAndSignUpWithSpinner isLoading={signingInOrOut} {...otherProps} />
                )
            }
          />
        </Switch>
      </ScrollableSection>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser, // collectionsArray: selectCollections
  signingInOrOut: isSigningInOrOut
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

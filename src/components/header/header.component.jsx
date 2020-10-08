import React from 'react'; // import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { HeaderContainer, LogoContainer, OptionDiv, OptionLink, OptionsContainer, Title } from './header.styles';
import { signingInOrOut } from '../../redux/user/user.actions';

const Header = ({ currentUser, hidden, signing }) => {
    return (
        <HeaderContainer>
            <LogoContainer to="/">
                <Logo className="logo" />
                <Title>CROWN CLOTHING</Title>
            </LogoContainer>
            <OptionsContainer>
                <OptionLink to="/shop"> SHOP </OptionLink>
                {/* <OptionLink to="/contact"> CONTACT </OptionLink> */}
                {
                    currentUser ?
                        (
                            <OptionDiv onClick={() => {
                                signing();
                                auth.signOut().then(res => {
                                    return setTimeout(() => { signing() }, 500);
                                })
                            }}>
                                SIGN OUT
                            </OptionDiv>
                        ) :
                        (
                            <OptionLink to="/sign-in">
                                SIGN IN
                            </OptionLink>
                        )
                }
                <CartIcon />
            </OptionsContainer>
            {
                hidden ? null : (<CartDropdown />)
            }
        </HeaderContainer>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

const mapDispatchToProps = (dispatch) => ({
    signing: () => dispatch(signingInOrOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
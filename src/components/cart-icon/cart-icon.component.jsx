import React from 'react';
import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { connect } from 'react-redux';

const CartIcon = ({ cartItems, toggleCartHidden }) => {
    return (
        <div className="cart-icon" onClick={() => toggleCartHidden(cartItems)}>
            <ShoppingIcon className="shopping-icon" />
            <span className="item-count">
                { (cartItems && cartItems.length > 0) ? cartItems.length : 0 } 
            </span>
        </div>
    );
}

const mapStateToProps = ({ cart: { cartItems } }) => ({
    cartItems
});

const mapDispathToProps = dispatch => ({
    toggleCartHidden: (cartItems) => dispatch(toggleCartHidden(cartItems))
});

export default connect(mapStateToProps, mapDispathToProps)(CartIcon);

import React from 'react';
import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

const CartIcon = ({ itemCount, toggleCartHidden }) => {
    return (
        <div className="cart-icon" onClick={() => toggleCartHidden(itemCount)}>
            <ShoppingIcon className="shopping-icon" />
            <span className="item-count">
                {itemCount} {/*(cartItems && cartItems.length > 0) ? cartItems.length : 0*/}
            </span>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount
});

const mapDispathToProps = dispatch => ({
    toggleCartHidden: (itemCount) => dispatch(toggleCartHidden(itemCount))
});

export default connect(mapStateToProps, mapDispathToProps)(CartIcon);

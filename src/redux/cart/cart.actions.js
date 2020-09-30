import { cartActionTypes } from "./cart.types";


export const toggleCartHidden = (cartItems) => ({
    type: cartActionTypes.TOGGLE_CART_HIDDEN,
    payload: cartItems
});

export const addItem = item => ({
    type: cartActionTypes.ADD_ITEM,
    payload: item
})
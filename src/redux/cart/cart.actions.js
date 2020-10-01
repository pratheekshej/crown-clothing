import { cartActionTypes } from "./cart.types";


export const toggleCartHidden = (itemCount = null) => ({
    type: cartActionTypes.TOGGLE_CART_HIDDEN,
    payload: itemCount
});

export const addItem = item => ({
    type: cartActionTypes.ADD_ITEM,
    payload: item
})
export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItems = cartItems.find(cartItem => (cartItem.id === cartItemToAdd.id));
    if (existingCartItems) {
        const filteredCartItems = cartItems.map(cartItem => (
            (cartItem.id === cartItemToAdd.id) ?
                { ...cartItem, quantity: cartItem.quantity + 1 } :
                cartItem
        ));
        return filteredCartItems;
    }
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const showCartToggle = (itemCount, val) => {
    if (itemCount === null || typeof itemCount === 'undefined' || itemCount === 0) {
        return true;
    } else {
        return val;
    }
}
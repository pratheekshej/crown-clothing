export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(cartItem => (cartItem.id === cartItemToAdd.id));
    if (existingCartItem) {
        const filteredCartItems = cartItems.map(cartItem => (
            (cartItem.id === cartItemToAdd.id) ?
                { ...cartItem, quantity: cartItem.quantity + 1 } :
                cartItem
        ));
        return filteredCartItems;
    }
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(cartItem => (cartItem.id === cartItemToRemove.id));
    if (existingCartItem.quantity === 1) {
        /* const filteredCartItems = cartItems.filter(cartItem => (
            (cartItem.id !== cartItemToRemove.id))
        ); 
        return filteredCartItems;
        */
        return cartItems;
    }
    return cartItems.map(cartItem => (
        cartItem.id === cartItemToRemove.id
    ) ? (
            { ...cartItem, quantity: cartItem.quantity - 1 }
        ) : cartItem
    );
};

export const showCartToggle = (itemCount, val) => {
    if (itemCount === null || typeof itemCount === 'undefined' || itemCount === 0) {
        return true;
    } else {
        return val;
    }
}
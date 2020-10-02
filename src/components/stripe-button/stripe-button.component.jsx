import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HXegnHoFOEl50D7nACfDuXrQzwjPCn3Vv9saFAVGefZ9ag5WdEyrdfMnqlAEk6e5aWvFsYqvZEMNdE3lVlaWYWl00NXyQ2LvX';
    const onToken = token => {
        console.log(token);
        alert("Payment successful");
    };

    return (
        <StripeCheckout
            label='Pay Now'
            name='Crown Clothing Pvt Ltd.'
            billingAddress
            shippingAddress
            image='https://previews.123rf.com/images/strizh/strizh1503/strizh150300043/37237147-gold-crown-isolated-on-white-background-vector-illustration.jpg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;
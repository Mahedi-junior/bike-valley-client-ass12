import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Checkout from './Checkout';

const Payment = () => {
    const myorders = useLoaderData();
    const { buyerName, email, productName, price, bookingId } = myorders;
    const stripePromise = loadStripe(process.env.REACT_APP_PK_KEY)


    return (
        <div>
            <h3 className="text-3xl">Payment for {productName}</h3>
            <p className='text-xl'>Please pay <span>{price}</span></p>

            <div>
                <Elements stripe={stripePromise}>
                    <Checkout
                        price={price}
                        email={email}
                        buyerName={buyerName}
                        id={bookingId}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
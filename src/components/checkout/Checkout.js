
import React from 'react';
import CheckoutForm from './CheckoutForm';
import {
    injectStripe,
    Elements,
    StripeProvider
} from "react-stripe-elements";
import { Container } from "semantic-ui-react";

const InjectedForm = injectStripe(CheckoutForm);
const API_KEY = process.env.REACT_APP_PUBLIC_STRIPE_API_KEY;

const WrappedForm = () => (
    <Container text className="container-content align-content-center">
        <StripeProvider apiKey={API_KEY}>
            <div>
                <h1>Complete your order</h1>
                <Elements>
                    <InjectedForm />
                </Elements>
            </div>
        </StripeProvider>
    </Container>
);


export default WrappedForm;
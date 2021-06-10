import React, { ReactElement } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import '.././styles/checkOut.css'

interface Props {}

export default function Checkout({}: Props): ReactElement {
const promise = loadStripe("pk_test_51IzgtYSCMgN4AzVBGEzeKvjxfmd4FQl6hPWIvdGP0wBB8bXfBExfQmKHOWK9hGAGZeOfr44s7mKNva3tRCnkRwU100H3OvZxNd");
  return (
    <div className="container card-payment-root">
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}


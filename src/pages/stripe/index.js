let stripeKey = "pk_live_51NuEF9BBuUCXkx9Pgx0WDJqL12fuWA4X5fkVu1HssRxDRm2GUIkFvUvCZEfvfu5dSAxM8SQdk5MbplnfrxY405MW00hw3HGvPn"
import { Elements, PaymentElement, useStripe, useElements, LinkAuthenticationElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios"
import { db } from '@/config/firebase';
import { doc, addDoc, collection } from "firebase/firestore";
import cookie from "js-cookie"
import { useEffect, useState } from 'react';
import { serverTimestamp } from 'firebase/firestore'; // Added this import

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const CheckoutForm = () => {
  const [userObject, setUserObject] = useState(null)
  var userCookie = cookie.get('user');

  useEffect(() => {
    if (userCookie) {
      setUserObject(JSON.parse(userCookie))

    }
  }, [userCookie]);


  const [paymentAlreadyCompleted, setPaymentAlreadyCompleted] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (paymentAlreadyCompleted) {
      setMessage("You have already completed the payment.");
      return;
    }

    setIsLoading(true);

    try {

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/submit`,
        },

      });

      if (error && (error.type === "card_error" || error.type === "validation_error")) {
        setMessage(error.message);
      } else if (error) {
        setMessage("An unexpected error occurred.");
      } else {
        // Handle successful payment (if needed)
        setMessage("Payment successful!");

        // Add a document to the 'Payment' collection in Firestore
        await addDoc(collection(db, 'Payment'), {
          email: userObject?.email,
          payment: 120,
          joiningDate: serverTimestamp(),
        });

        setPaymentAlreadyCompleted(true); // Update payment status
      }
    } catch (error) {
      console.error(error);
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  }
  return (
    <center>
      <form id="payment-form" onSubmit={handleSubmit} style={{ width: '50%' }}>
        <LinkAuthenticationElement id="link-authentication-element"
        // Access the email value like so:
        // onChange={(event) => {
        //  setEmail(event.value.email);
        // }}
        //
        // Prefill the email field like so:
        // options={{defaultValues: {email: 'foo@bar.com'}}}
        />
        <PaymentElement id="payment-element" />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </center>
  )
};

export default function index() {
  const [secret, setSecret] = useState('');
  console.log("in index function")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/payment');
        console.log("data res:", res?.data);
        setSecret(res?.data?.clientSecret);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const options = {
    // passing the client secret obtained from the server
    clientSecret: secret,
  };

  return (<div className='' >

    <h1 className='my-14 flex justify-center items-center font-bold '>
      CHECKOUT
    </h1>
    <div className='my-18 flex justify-center items-center'>
      {secret && (
        <Elements stripe={stripePromise} options={options}>
          <div  className=" w-[50%] bg-[#CCCCCC] rounded-2xl mb-32" >
            <CheckoutForm  />
          </div>
        </Elements>
      )}
    </div>
  </div>
  );
};
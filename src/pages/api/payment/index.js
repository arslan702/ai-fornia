import Stripe from "stripe";
const stripe = new Stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
import cookie from "js-cookie"

export default async (req, res) => {
  switch(req.method){
    case "GET":
      await createPayment(req, res)
      break;
  }
}

const createPayment = async (req, res) => {
  try {
    // Check if the user has already paid (you'll need to implement this logic)
    const userHasPaid = false; // Replace with your logic to check if user has paid

    if (userHasPaid) {
      return res.send({
        message: "You have already completed the payment.",
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'USD',
      amount: 12000, // This represents 120 dollars in cents
      automatic_payment_methods: { enabled: true }
    });
    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
};